const DB='jorge21k';
let db;

export function initDB(){
return new Promise((res,rej)=>{
 const req=indexedDB.open(DB,2);
 req.onupgradeneeded=e=>{
  db=e.target.result;
  if(!db.objectStoreNames.contains('workouts')){
   let s=db.createObjectStore('workouts',{keyPath:'id'});
   s.createIndex('pendingSync','pendingSync');
  }
  if(!db.objectStoreNames.contains('observations')){
   let o=db.createObjectStore('observations',{keyPath:'id'});
   o.createIndex('pendingSync','pendingSync');
  }
 };
 req.onsuccess=e=>{db=e.target.result;res(db)}
 req.onerror=rej;
})
}

function store(name,mode='readwrite'){
 return db.transaction(name,mode).objectStore(name);
}

export function saveLocal(name,obj){
 return new Promise((res,rej)=>{
   let tx=db.transaction(name,'readwrite');
   tx.objectStore(name).put({...obj,pendingSync:true,updated_at:Date.now()});
   tx.oncomplete=()=>res();
   tx.onerror=rej;
 });
}

export function getPending(name){
 return new Promise((res,rej)=>{
  let r=store(name,'readonly').getAll();
  r.onsuccess=()=>res(r.result.filter(x=>x.pendingSync));
  r.onerror=rej;
 });
}

export function markSynced(name,id){
 return new Promise((res,rej)=>{
  let s=store(name);
  let g=s.get(id);
  g.onsuccess=()=>{
   let item=g.result;
   item.pendingSync=false;
   s.put(item);
   res();
  };
  g.onerror=rej;
 });
}
