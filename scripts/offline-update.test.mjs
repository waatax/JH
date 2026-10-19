import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const source=fs.readFileSync('dist/sw.js','utf8');
function setup(online){
 const handlers={},stored=new Map([['https://example.test/JH/app.js',new Response('old')]]);
 const cache={match:async r=>stored.get(typeof r==='string'?r:r.url),put:async(r,v)=>stored.set(r.url,v)};
 vm.runInNewContext(source,{self:{location:{origin:'https://example.test'},addEventListener:(name,fn)=>handlers[name]=fn},caches:{open:async()=>cache},URL,fetch:async(r,options)=>{assert.equal(options.cache,'no-cache');if(!online)throw new Error('offline');return new Response('new');}});
 return handlers;
}
test('online lesson reload returns the new response instead of the old cache',async()=>{
 let response;setup(true).fetch({request:{url:'https://example.test/JH/app.js',method:'GET',mode:'cors'},respondWith:r=>response=r});assert.equal(await (await response).text(),'new');
});
test('offline lesson reload retains the cached module',async()=>{
 let response;setup(false).fetch({request:{url:'https://example.test/JH/app.js',method:'GET',mode:'cors'},respondWith:r=>response=r});assert.equal(await (await response).text(),'old');
});
