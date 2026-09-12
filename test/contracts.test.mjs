import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { validate, review, roles, compose } from '../src/compose.mjs';
const evidence = { nodes: [{ id:'kg:real',label:'receipt',type:'function',owner:'commerce',path:'checkout.ts',line:1,sha256:'a'.repeat(64),excerpt:'function receipt() {}' }], sourceManifest:{digest:'manifest'},expectedSnapshotDigest:'snapshot',gaps:[] };
const run = { cid:'launch-copilot/test',revision:'r1',slug:'test',title:'test',requirement:'Sell one small agent service.',target:'/target',base:'base',evidence };
const payload = () => ({ claims:[{id:'C1',text:'The source declares receipt.',ref:'kg:real'},{id:'C2',text:'Add a reviewed offer.',ref:'new',owner:'product',check:'Complete the buyer loop.'}],sections:Object.fromEntries(roles.map(r=>[r,{summary:'A narrow, unvalidated service offer.',claimIds:['C1','C2']}])),questions:['Will a buyer pay?'] });
test('five exact roles share CID, revision, source binding and byte-sensitive approval',()=>{
  const p=payload(), r=review(run,p); assert.equal(Object.keys(r.docs).length,5);
  for(const role of roles){ assert.match(r.docs[role],/continuity_id: launch-copilot\/test/);assert.match(r.docs[role],/revision: r1/);assert.match(r.docs[role],/kg:real/);assert.match(r.docs[role],/\*\*NEW\*\*/); }
  p.sections.tad.summary+=' Changed.'; assert.notEqual(review(run,p).reviewHash,r.reviewHash);
  assert.notEqual(review({...run,base:'other'},payload()).reviewHash,r.reviewHash);
  assert.notEqual(review({...run,revision:'r2'},payload()).reviewHash,r.reviewHash);
});
test('rejects invented nodes, missing roles, unknown claims, missing NEW checks and active content',()=>{
  for(const mutate of [p=>p.claims[0].ref='kg:invented',p=>delete p.sections.gtm,p=>p.sections.tad.claimIds=['C9'],p=>delete p.claims[1].check,p=>p.questions=['<img src=x onerror=alert(1)>'],p=>p.claims.push(p.claims[0])]){const p=payload();mutate(p);assert.throws(()=>validate(p,evidence));}
});
test('empty evidence permits explicit NEW work but never an existing claim',()=>{
  const p=payload();assert.throws(()=>validate(p,{nodes:[]}));p.claims.shift();for(const r of roles)p.sections[r].claimIds=['C2'];assert.doesNotThrow(()=>validate(p,{nodes:[]}));
});
async function provider(t, handler){const server=createServer(handler);await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>server.close(r)));return `http://127.0.0.1:${server.address().port}`;}
test('reuses Graph Responses proxy, caps output and repairs only once',async t=>{
  let calls=0;
  const graphUrl=await provider(t,async(req,res)=>{let raw='';for await(const c of req)raw+=c;const body=JSON.parse(raw);calls++;
    assert.equal(req.url,'/__chat_proxy/v1/responses');assert.equal(req.headers['x-kg-chat-provider'],'openai');assert.equal(req.headers.authorization,undefined);assert.equal(body.store,false);assert.equal(body.max_output_tokens,6000);
    const p=payload();if(calls===1)p.claims[0].ref='invented';res.end(JSON.stringify({status:'completed',output_text:JSON.stringify(p),usage:{input_tokens:300,output_tokens:500,total_tokens:800}}));});
  const r=await compose({graphUrl,model:'test-only'},run,AbortSignal.timeout(3000));assert.equal(calls,2);assert.equal(r.metrics.calls,2);assert.equal(r.manifest.length,5);
});
test('invalid second response stops; missing credential never retries or fabricates docs',async t=>{
  let calls=0;const graphUrl=await provider(t,(_req,res)=>{calls++;res.end(JSON.stringify({status:'completed',output_text:'{}'}));});
  await assert.rejects(compose({graphUrl,model:'test-only'},run),/structured claims/);assert.equal(calls,2);
  const unauthorized=await provider(t,(_req,res)=>{res.statusCode=401;res.end('{}');});await assert.rejects(compose({graphUrl:unauthorized,model:'test-only'},run),/401/);
});
test('cancelled composition performs no provider call; oversized input is rejected',async()=>{
  const c=new AbortController();c.abort();await assert.rejects(compose({graphUrl:'http://127.0.0.1:1'},run,c.signal),/abort/i);
  await assert.rejects(compose({graphUrl:'http://127.0.0.1:1'},{...run,requirement:'a'.repeat(9000)}),/input budget/);
});
