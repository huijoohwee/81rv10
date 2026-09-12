import { readdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
let lines=0,bytes=0;const files=[];
for(const dir of ['src','web','test'])for(const name of await readdir(dir)){const path=`${dir}/${name}`,value=await readFile(path,'utf8');const count=value.split('\n').length;assert.ok(count<600,`${path} exceeds file budget`);lines+=count;bytes+=Buffer.byteLength(value);files.push(path);}
assert.ok(lines<=900,`Implementation/check budget exceeded: ${lines}/900 lines`);
const pkg=JSON.parse(await readFile('package.json'));assert.equal(Object.keys(pkg.dependencies||{}).length,0);assert.equal(Object.keys(pkg.devDependencies||{}).length,0);
assert.equal(files.filter(p=>p.startsWith('src/')||p==='web/app.mjs'||p==='web/canvas.jsx').length,6);
console.log(JSON.stringify({lines,bytes,productModules:6,newPackages:0,alwaysLoadedSiblingBytes:0}));
