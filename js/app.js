import {initDB} from './storage/indexeddb.js';
import {startSyncEngine} from './services/sync-engine.js';
import {initAuth} from './services/auth.js';

await initDB();
await initAuth();
await startSyncEngine();
