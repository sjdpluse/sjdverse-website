import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  // This is how to get environment variables.
  // These are configured in your Supabase project settings.
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

  // Best practice: Add CORS headers to allow requests from your website
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // For production, use your actual domain e.g., 'https://sjdpluse.github.io'
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
  };

  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  return new Response(
    JSON.stringify({
      url: supabaseUrl,
      key: supabaseAnonKey,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
