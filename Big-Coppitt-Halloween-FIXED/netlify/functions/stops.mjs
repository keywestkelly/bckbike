import {store,reply,records,pointDefault} from './_shared.mjs';
export default async (req)=>{
 if(req.method!=='GET')return reply({error:'Method not allowed'},405);
 try {const s=store();const [all,start]=await Promise.all([records(s),s.get('config/start',{type:'json'})]);
 return reply({stops:all.filter(x=>x.status!=='rejected').map(({id,address,note,lat,lng})=>({id,address,note,lat,lng})),start:start||pointDefault,startConfirmed:!!start});
 } catch(e){console.error(e);return reply({error:'Unable to load stops'},500);}
};
