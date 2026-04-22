import {supabase} from './supabase.js';

export async function initAuth(){
 let {data:{session}}=await supabase.auth.getSession();
 if(!session){
   console.log('Login por magic link recomendado');
 }
}
export async function sendMagicLink(email){
 return supabase.auth.signInWithOtp({email});
}
