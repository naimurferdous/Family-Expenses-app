import assert from 'node:assert/strict';
import {parsePriceSummary} from '../scripts/collect-dam-prices.mjs';
const fixture=`<html><body><div>Aman-Fine: 72.00 - 75.00</div><div>Egg Farm-Red: 47.00 - 48.00</div><div>Green Chili: 218.00 - 237.00</div></body></html>`;
const parsed=parsePriceSummary(fixture);
assert.equal(parsed.length,3);
assert.deepEqual(parsed[0],{name:'Aman-Fine',min:72,max:75,unit:''});
assert.equal(parsed[2].max,237);
console.log('DAM parser fixture: OK');
