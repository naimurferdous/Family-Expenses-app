import assert from 'node:assert/strict';
import { patchTemplateSource } from '../scripts/patch-capacitor-tar-compat.mjs';

assert.equal(patchTemplateSource('await tar_1.default.extract({ file: src, cwd: dir });'), 'await tar_1.x({ file: src, cwd: dir });');
assert.equal(patchTemplateSource('await tar_1.extract({ file: src, cwd: dir });'), 'await tar_1.x({ file: src, cwd: dir });');
assert.equal(patchTemplateSource('await tar.default.extract({ file: src, cwd: dir });'), 'await tar.x({ file: src, cwd: dir });');
assert.equal(patchTemplateSource('await tar.extract({ file: src, cwd: dir });'), 'await tar.x({ file: src, cwd: dir });');
assert.equal(patchTemplateSource('await tar_1.x({ file: src, cwd: dir });'), 'await tar_1.x({ file: src, cwd: dir });');
assert.throws(() => patchTemplateSource('some unrelated template source'), /Unrecognized Capacitor template extractor/);
console.log('Capacitor tar compatibility tests passed.');
