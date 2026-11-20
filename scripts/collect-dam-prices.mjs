#!/usr/bin/env node
/**
 * Collect the DAM homepage commodity summary into www/livefacts/dam-prices.json.
 * DAM pages can be JS-rendered and their district/market report requires form
 * filters. This collector only publishes ranges it can parse from the public
 * summary; it never invents prices. A parser fixture test is included.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const URL = process.env.DAM_URL || 'https://market.dam.gov.bd/?L=E';
const OUT = process.env.DAM_OUT || 'www/livefacts/dam-prices.json';
const htmlToText = s => s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/\s+/g,' ').trim();
const known = [
 ['Aman-Fine', ['Aman-Fine','আমন চাল - সরু','আমন চাল সরু']],
 ['Aman-Medium',['Aman-Medium','আমন চাল - মাঝারি']],
 ['Aman-Coarse',['Aman-Coarse','আমন চাল - মোটা']],
 ['Boro-Fine',['Boro-Fine','বোরো চাল - সরু']],
 ['Boro-Medium',['Boro-Medium','বোরো চাল - মাঝারি']],
 ['Boro-Coarse',['Boro-Coarse','বোরো চাল - মোটা']],
 ['Ata (packet)',['Ata (packet)','আটা (প্যাকেটজাত)']],
 ['Farm-raised Hen',['Farm-raised Hen','খামারের মুরগী']],
 ['Beef',['Beef','গরু']],
 ['Egg Farm-Red',['Egg Farm-Red','ডিম ফার্ম - লাল']],
 ['Sugar (Local)',['Sugar (Local)','চিনি (দেশী)']],
 ['Iodized Salt (Packed)',['Iodized Salt (Packed)','আয়োডিনযুক্ত লবণ (প্যাকেটজাত)']],
 ['Mung',['Mung','মুগ ডাল']],
 ['Gram-Whole',['Gram-Whole','ছোলা - গোটা']],
 ['Soybean',['Soybean','সয়াবিন তেল','সয়াবিন তেল']],
 ['Onion-local',['Onion-local','পেঁয়াজ - দেশী','পেঁয়াজ - দেশী']],
 ['Garlic-local',['Garlic-local','রসুন - দেশী']],
 ['Garlic-Imported',['Garlic-Imported','রসুন - আমদানিকৃত']],
 ['Green Chili',['Green Chili','কাঁচা মরিচ']],
 ['Ginger-local',['Ginger-local','আদা - দেশী']],
 ['Ginger-Imported',['Ginger-Imported','আদা - আমদানিকৃত']],
 ['Mutton',['Mutton','খাসী']]
];
const normalize = s => s.toLowerCase().replace(/[\s\u200b\u200c\u200d-]+/g,' ').trim();
export function parsePriceSummary(html) {
 const text=htmlToText(html); const items=[];
 for(const [name,aliases] of known){
   let found=null;
   for(const alias of aliases){
     const at=text.toLowerCase().indexOf(alias.toLowerCase()); if(at<0)continue;
     // Search a short window after the label for two range values.
     const window=text.slice(at,at+180);
     const m=window.match(/(?:[:：]\s*)?([\d,]+(?:\.\d{1,2})?)\s*(?:-|–|—|to)\s*([\d,]+(?:\.\d{1,2})?)/i);
     if(m){const min=Number(m[1].replace(/,/g,'')),max=Number(m[2].replace(/,/g,''));if(Number.isFinite(min)&&Number.isFinite(max)&&min<=max){found={name,min,max,unit:''};break}}
   }
   if(found)items.push(found);
 }
 return items;
}
export async function collect({html=null,fetchImpl=fetch}={}){
 const response=html===null?await fetchImpl(URL,{headers:{'user-agent':'FamilyExpenses-DAM-price-collector/1.0'},signal:AbortSignal.timeout(25000)}):null;
 if(response&&!response.ok)throw new Error(`DAM fetch HTTP ${response.status}`);
 const body=html===null?await response.text():html;
 const items=parsePriceSummary(body);
 if(!items.length)throw new Error('Parser found no price ranges. DAM markup/source may have changed; do not publish an empty/false report.');
 const now=new Date(),reportDate=(htmlToText(body).match(/Report Date\s*:\s*([^|]+)/i)||[])[1]?.trim()||null;
 const data={source:'Bangladesh Department of Agricultural Marketing (DAM) public summary',source_url:URL,report_date:reportDate,fetched_at:now.toISOString(),parser:'DAM summary range parser v1',unit_note:'Commodity units were not captured by this parser; check the official report before comparing quantity-based prices.',items};
 await fs.mkdir(path.dirname(OUT),{recursive:true});await fs.writeFile(OUT,JSON.stringify(data,null,2)+'\n');return data;
}
if(fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){try{const d=await collect();console.log(`Updated ${OUT}: ${d.items.length} parsed commodities, report date ${d.report_date}`)}catch(e){console.error(e.message);process.exitCode=1}}
