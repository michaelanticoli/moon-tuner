 import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 const logStep = (step: string, details?: any) => {
   const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
   console.log(`[SUBSCRIBE-EMAIL] ${step}${detailsStr}`);
 };
 
 serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const { email, source = "website" } = await req.json();
     
     if (!email) {
       throw new Error("Email is required");
     }
     
     logStep("Processing subscription", { email, source });
 
     const mailerliteApiKey = Deno.env.get("MAILERLITE_API_KEY");
     if (!mailerliteApiKey) {
       throw new Error("MAILERLITE_API_KEY is not configured");
     }
 
     // Subscribe to MailerLite
     const mailerliteResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         "Authorization": `Bearer ${mailerliteApiKey}`,
       },
       body: JSON.stringify({
         email,
         fields: {
           source,
         },
         status: "active",
       }),
     });
 
     const mailerliteData = await mailerliteResponse.json();
     
     if (!mailerliteResponse.ok) {
       logStep("MailerLite API error", mailerliteData);
       // Don't throw - still save to database
     } else {
       logStep("MailerLite subscription successful", { subscriberId: mailerliteData.data?.id });
     }
 
     // Also save to database for backup
     const supabaseClient = createClient(
       Deno.env.get("SUPABASE_URL") ?? "",
       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
       { auth: { persistSession: false } }
     );
 
     const { error: dbError } = await supabaseClient
       .from("newsletter_subscribers")
       .upsert(
         { 
           email, 
           source,
           convertkit_subscriber_id: mailerliteData.data?.id?.toString() || null,
         },
         { onConflict: "email" }
       );
 
     if (dbError) {
       logStep("Database save error (non-fatal)", { error: dbError.message });
     } else {
       logStep("Saved to database");
     }
 
     return new Response(
       JSON.stringify({ 
         success: true, 
         message: "Successfully subscribed!",
         subscriberId: mailerliteData.data?.id 
       }),
       {
         headers: { ...corsHeaders, "Content-Type": "application/json" },
         status: 200,
       }
     );
   } catch (error) {
     const errorMessage = error instanceof Error ? error.message : String(error);
     logStep("ERROR", { message: errorMessage });
     return new Response(
       JSON.stringify({ success: false, error: errorMessage }),
       {
         headers: { ...corsHeaders, "Content-Type": "application/json" },
         status: 500,
       }
     );
   }
 });