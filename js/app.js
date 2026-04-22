import { initDB } from './storage/indexeddb.js';
import { syncPending } from './services/sync-engine.js';

await initDB();
await syncPending();

console.log('JORGE 21K sync ready');
