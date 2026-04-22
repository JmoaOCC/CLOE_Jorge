import {supabase} from './supabase.js';
import {getPendingSyncWorkouts,markSynced} from '../storage/indexeddb.js';

export async function syncPending(){
 if(!navigator.onLine) return;
 const pending=await getPendingSyncWorkouts();
 for(const workout of pending){
   await supabase.from('workouts').upsert(workout);
   await markSynced(workout.id);
 }
}

window.addEventListener('online',syncPending);
