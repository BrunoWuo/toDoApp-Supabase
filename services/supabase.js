import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jxpjffpukycazozbchkn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cGpmZnB1a3ljYXpvemJjaGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTE5MDQsImV4cCI6MjA2OTQ2NzkwNH0.Y_aosrHbD6MJwnRXvTeKSEY15JwsI3vE3oaJHVi_0mk'; // encontrada em Settings > API > anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
