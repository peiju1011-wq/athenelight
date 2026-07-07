// @ts-nocheck
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { userId, newPassword } = await req.json();

    if (!userId || !newPassword) {
      return Response.json(
        { success: false, message: "缺少 userId 或 newPassword" },
        { status: 400, headers: corsHeaders }
      );
    }

  const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

  const { data, error } =
  await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      password: newPassword,
    }
  );

return Response.json(
  {
    success: !error,
    data,
    error: error
      ? {
          message: error.message,
          status: error.status,
          code: error.code,
          name: error.name,
        }
      : null,
    url: !!Deno.env.get("SUPABASE_URL"),
    key: !!Deno.env.get("SERVICE_ROLE_KEY"),
  },
  {
    status: 200,
    headers: corsHeaders,
  }
);

    if (error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 400, headers: corsHeaders }
      );
    }

    return Response.json(
      { success: true },
      { status: 200, headers: corsHeaders }
    );

  } catch (err) {
    return Response.json(
      { success: false, message: String(err) },
      { status: 500, headers: corsHeaders }
    );
  }
});