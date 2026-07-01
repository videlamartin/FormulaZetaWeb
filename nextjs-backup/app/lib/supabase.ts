// app/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Usamos valores por defecto (placeholders) en caso de que no existan las variables
// de entorno al momento de hacer el build (por ejemplo, en Vercel o Netlify sin configurar).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ejemplo.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
