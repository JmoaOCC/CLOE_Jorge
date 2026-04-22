import {saveLocal} from '../storage/indexeddb.js';

export async function addWorkout(data){
 await saveLocal('workouts',{
   id:crypto.randomUUID(),
   ...data
 });
}
