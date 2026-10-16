import {store,reply,records,authorized,validPoint,pointDefault} from './_shared.mjs';
export default async(req)=>{
 if(!authorized(req))return reply({error:'Unauthorized. Check your administrator token.'},401);
 try{
  const s=store();
  if(req.method==='GET'){
   const [all,start]=await Promise.all([records(s),s.get('config/start',{type:'json'})]);
   return reply({stops:all,start:start||pointDefault,startConfirmed:!!start});
  }
  if(req.method==='PATCH'){
   const input=await req.json();
   if(input.action==='setStart'){
    const lat=Number(input.lat),lng=Number(input.lng);
    if(!validPoint(lat,lng))return reply({error:'Starting point must be in Big Coppitt.'},400);
    await s.setJSON('config/start',{lat,lng});return reply({ok:true});
   }
   if(!['approve','reject','delete'].includes(input.action)||typeof input.id!=='string'||!/^[a-f0-9-]{36}$/.test(input.id))return reply({error:'Invalid action'},400);
   const key='stop/'+input.id;const old=await s.get(key,{type:'json'});
   if(!old)return reply({error:'Stop not found'},404);
   if(input.action==='delete'){await s.delete(key);return reply({ok:true});}
   old.status=input.action==='approve'?'approved':'rejected';
   await s.setJSON(key,old);return reply({ok:true});
  }
  return reply({error:'Method not allowed'},405);
 }catch(e){console.error(e);return reply({error:'Administrator request failed'},500);}
};
