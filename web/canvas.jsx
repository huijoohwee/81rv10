import React from 'react';
import { createRoot } from 'react-dom/client';
import RichMediaPanel from '@graph-panel';
const roots = new WeakMap();
const documentHtml = doc => '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:15px;color:#252b3e;background:#fff}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,monospace;margin:0}</style><pre>' + doc.slice(doc.indexOf('\n# ')+1).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;') + '</pre>';
export function renderCanvas(element, run) {
  let root = roots.get(element); if (!root) { root = createRoot(element); roots.set(element,root); }
  const nodes = run.evidence.nodes, positions = new Map(nodes.map((n,i)=>[n.id,{x:15+(i%2)*305,y:15+Math.floor(i/2)*66}]));
  const height = Math.max(90,Math.ceil(nodes.length/2)*66+20);
  root.render(<><p className="small muted">Solid = existing source. Dashed + NEW = proposed work. This bounded projection does not imply complete impact.</p><svg viewBox={`0 0 620 ${height}`} role="img" aria-label="Existing source nodes connected by explained graph edges"><g stroke="#99a9b7" strokeWidth="2">{run.evidence.edges.map(({edge})=>{const a=positions.get(edge.source),b=positions.get(edge.target);return a&&b?<line key={edge.id} x1={a.x+140} y1={a.y+24} x2={b.x+140} y2={b.y+24}/>:null;})}</g>{nodes.map(n=>{const p=positions.get(n.id);return <g key={n.id}><title>{n.id} · {n.path}:{n.line}</title><rect {...p} width="280" height="48" rx="7" fill="#fff" stroke="#809aa1"/><text x={p.x+12} y={p.y+19} fontSize="9" fill="#64816f">EXISTING · {n.type.slice(0,32)}</text><text x={p.x+12} y={p.y+36} fontSize="12" fill="#191f36">{n.label.slice(0,38)}</text></g>;})}</svg>
  {run.payload && <svg viewBox="0 0 620 55" aria-label="Proposed attachments from evidence to the new scope"><path d="M155 0 V20 H310 V55 M460 0 V20 H310" stroke="#9c82d0" strokeDasharray="5 5" fill="none"/><text x="320" y="44" fontSize="10" fill="#7753a8">NEW · proposed attachments</text></svg>}
  {run.payload?.claims.filter(c=>c.ref==='new').map(c=><div key={c.id} className="proposal-node"><b>NEW · {c.owner}</b><p>{c.text}</p><small>Future check: {c.check}</small></div>)}
  <div className="canvas-panels">{Object.entries(run.docs||{}).map(([role,doc])=><div key={role} className="canvas-panel"><h4>NEW {role.toUpperCase()} · {run.revision} · attached to {run.payload.sections[role].claimIds.join(', ')}</h4><RichMediaPanel title={role.toUpperCase()} url="" srcDoc={documentHtml(doc)} interactive={true} placementOwner="parent" frameMode="surface" kind="iframe" panelChrome="none" style={{height:235,width:'100%'}}/></div>)}</div></>);
}
