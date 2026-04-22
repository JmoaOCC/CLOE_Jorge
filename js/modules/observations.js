import {saveLocal} from '../storage/indexeddb.js';

export async function addObservation(workoutId,text){
 await saveLocal('observations',{
   id:crypto.randomUUID(),
   workout_id:workoutId,
   content:text
 });
}
