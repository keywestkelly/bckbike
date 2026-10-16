import { getStore } from '@netlify/blobs';
import { timingSafeEqual } from 'node:crypto';
export const store = () => getStore('big-coppitt-sweet-stops');
export const reply = (data,status=200) => Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export function authorized(req){
  const secret=process.env.ADMIN_TOKEN;
  const provided=req.headers.get('authorization')?.replace(/^Bearer\s+/i,'')||'';
  if(!secret || secret.length<24 || !provided) return false;
  const a=Buffer.from(secret),b=Buffer.from(provided);
  return a.length===b.length && timingSafeEqual(a,b);
}
export function validPoint(lat,lng){return Number.isFinite(lat)&&Number.isFinite(lng)&&lat>=24.56&&lat<=24.63&&lng>=-81.72&&lng<=-81.60;}
export async function records(s){
  const {blobs}=await s.list({prefix:'stop/'});
  const values=await Promise.all(blobs.slice(0,1500).map(b=>s.get(b.key,{type:'json'}).catch(()=>null)));
  return values.filter(Boolean).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
}
export const pointDefault={lat:24.598,lng:-81.657}; // Placeholder center; administrator sets exact park pin before sharing
