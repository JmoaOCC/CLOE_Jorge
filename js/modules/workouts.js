import {saveWorkoutLocal} from '../storage/indexeddb.js';
import {syncPending} from '../services/sync-engine.js';

export async function addWorkout(data){
 const workout={
   id:crypto.randomUUID(),
   ...data
 };
 await saveWorkoutLocal(workout);
 await syncPending();
}
