const SUPABASE_URL='TU_URL';
const SUPABASE_ANON_KEY='TU_KEY';
export const supabase=window.supabase.createClient(
SUPABASE_URL,SUPABASE_ANON_KEY
);
