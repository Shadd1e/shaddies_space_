import {createAdminClient} from '@/lib/supabase/admin';
const validToken=value=>/^[0-9a-f-]{36}$/i.test(value||'');
export async function GET(req){
 const token=new URL(req.url).searchParams.get('token')||'';
 if(!validToken(token))return new Response('Invalid unsubscribe link.',{status:400});
 const html=`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Automate X email preferences</title></head><body style="font-family:system-ui,sans-serif;max-width:520px;margin:12vh auto;padding:24px;color:#202124"><h1>Unsubscribe from course reminders?</h1><p>This will stop Automate X inactivity and discount reminder emails. Essential account and security messages may still be sent.</p><form method="post"><input type="hidden" name="token" value="${token}"><button style="padding:12px 18px;border:0;border-radius:8px;background:#202124;color:white;font-weight:600">Confirm unsubscribe</button></form></body></html>`;
 return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
}
export async function POST(req){
 let token='';try{const form=await req.formData();token=String(form.get('token')||'')}catch{return new Response('Invalid request.',{status:400})}
 if(!validToken(token))return new Response('Invalid unsubscribe link.',{status:400});
 const admin=createAdminClient();
 const {data,error}=await admin.from('ax_enrollments').update({unsubscribed_at:new Date().toISOString()}).eq('unsubscribe_token',token).is('unsubscribed_at',null).select('user_id').maybeSingle();
 if(error)return new Response('We could not update your reminder preference. Please contact support@shaddies.space.',{status:500});
 return new Response(data?'You have been unsubscribed from Automate X reminder emails.':'This link has already been used or is invalid.',{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}});
}
