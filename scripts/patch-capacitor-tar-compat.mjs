import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export function patchTemplateSource(source) {
  const patterns = [
    [ /\btar_1\.default\.extract(?=\s*\()/g, 'tar_1.x' ],
    [ /\btar_1\.extract(?=\s*\()/g, 'tar_1.x' ],
    [ /\btar\.default\.extract(?=\s*\()/g, 'tar.x' ],
    [ /\btar\.extract(?=\s*\()/g, 'tar.x' ],
  ];
  let patched = source;
  for (const [pattern, replacement] of patterns) patched = patched.replace(pattern, replacement);
  if (patched !== source) return patched;
  if (/\btar(?:_1)?\.x(?=\s*\()/.test(source)) return source;
  throw new Error('Unrecognized Capacitor template extractor. Refusing to patch an unknown CLI version.');
}

function main() {
  const templatePath = 'node_modules/@capacitor/cli/dist/util/template.js';
  if (!fs.existsSync(templatePath)) throw new Error(`Missing Capacitor CLI template: ${templatePath}`);
  const tar = requireTar();
  if (typeof tar.x !== 'function') throw new Error('Installed tar package does not expose tar.x; cannot apply compatibility fix.');
  const source = fs.readFileSync(templatePath, 'utf8');
  const patched = patchTemplateSource(source);
  if (patched !== source) fs.writeFileSync(templatePath, patched);
  console.log('Capacitor CLI tar extraction compatibility patch applied/verified.');
}
function requireTar() {
  // CommonJS require is available from this ESM file through createRequire.
  return createRequire(import.meta.url)('tar');
}
import { createRequire } from 'node:module';
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
