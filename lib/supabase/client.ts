import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfig } from "./config";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  const { url, anonKey } = supabaseConfig();
  if (!client) {
    client = createBrowserClient(url, anonKey);
  }
  return client;
}
