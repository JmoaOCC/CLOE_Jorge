import {supabase} from './supabase.js';
import {getPending,markSynced} from '../storage/indexeddb.js';

function status(t){
 const el=document.getElementById('syncStatus');
 if(el) el.textContent=t;
}

async function pushStore(store,table){
 const rows=await getPending(store);
 for(const row of rows){
   await supabase.from(table).upsert(row);
   await markSynced(store,row.id);
 }
}

export async function syncNow(){
 if(!navigator.onLine){
  status('Offline');
  return;
 }
 status('Sincronizando...');
 await pushStore('workouts','workouts');
 await pushStore('observations','observations');
 status('Sincronizado');
}

export async function startSyncEngine(){
 await syncNow();
 setInterval(syncNow,30000);
 window.addEventListener('online',syncNow);
}
