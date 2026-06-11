import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nfhilpjladaaibfwygkj.supabase.co";
const supabaseKey = "sb_publishable_9xnyp4lTL35nCLz7piBBOg_K8jfKWFE";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);