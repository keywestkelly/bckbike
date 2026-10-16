import {randomUUID} from 'node:crypto';
import {store,reply,validPoint} from './_shared.mjs';
export default async(req)=>{
 if(req.method!=='POST')return reply({error:'Method not allowed'},405);
 if(Number(req.headers.get('content-length')||0)>5000)return reply({error:'Request too large'},413);
 try {
  const raw=await req.text();if(raw.length>5000)return reply({error:'Request too large'},413);
  const input=JSON.parse(raw);
  if(input.website)return reply({ok:true}); // honeypot
  const address=String(input.address||'').trim().slice(0,160);
  const note=String(input.note||'').trim().slice(0,180);
  const lat=Number(input.lat),lng=Number(input.lng);
  if(address.length<5||!validPoint(lat,lng))return reply({error:'Enter an address and select its location on the map in Big Coppitt.'},400);
  if(!/^[\p{L}\p{N}\s.,#'\-\/]+$/u.test(address))return reply({error:'Please enter a normal street address.'},400);
  const s=store();const id=randomUUID();
  await s.setJSON('stop/'+id,{id,address,note,lat,lng,status:'approved',createdAt:new Date().toISOString()},{onlyIfNew:true});
  return reply({ok:true,message:'Your Sweet Stop is now on the map!'},201);
 }catch(e){console.error(e);return reply({error:'Could not save submission. Try again.'},500);}
};
