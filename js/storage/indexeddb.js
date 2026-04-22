const DB_NAME='jorge21k';
let db;

export function initDB(){
 return new Promise((resolve,reject)=>{
  const request=indexedDB.open(DB_NAME,1);
  request.onupgradeneeded=e=>{
    db=e.target.result;
    if(!db.objectStoreNames.contains('workouts')){
      db.createObjectStore('workouts',{keyPath:'id'});
    }
  };
  request.onsuccess=e=>{db=e.target.result;resolve(db);}
  request.onerror=reject;
 });
}

export function saveWorkoutLocal(workout){
 return new Promise((resolve,reject)=>{
   const tx=db.transaction('workouts','readwrite');
   tx.objectStore('workouts').put({...workout,pendingSync:true});
   tx.oncomplete=()=>resolve();
   tx.onerror=reject;
 });
}

export function getPendingSyncWorkouts(){
 return new Promise((resolve,reject)=>{
  const tx=db.transaction('workouts','readonly');
  const req=tx.objectStore('workouts').getAll();
  req.onsuccess=()=>resolve(req.result.filter(x=>x.pendingSync));
  req.onerror=reject;
 });
}

export function markSynced(id){
 return new Promise((resolve,reject)=>{
  const tx=db.transaction('workouts','readwrite');
  const store=tx.objectStore('workouts');
  const req=store.get(id);
  req.onsuccess=()=>{
    const item=req.result;
    item.pendingSync=false;
    store.put(item);
    resolve();
  };
  req.onerror=reject;
 });
}
