import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailHtml(name: string, email: string, message: string): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding: 0 0 32px 0;">
              <span style="font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">thanas.</span>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background-color: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 0;">
              
              <!-- Header -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 36px 36px 24px 36px; border-bottom: 1px solid #1a1a1a;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #555555; font-family: 'JetBrains Mono', 'SF Mono', monospace;">New Message</p>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.3px;">Portfolio Contact Form</h1>
                  </td>
                </tr>
              </table>

              <!-- Sender Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 28px 36px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <p style="margin: 0 0 4px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #555555; font-family: 'JetBrains Mono', 'SF Mono', monospace;">From</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 500; color: #ffffff;">${safeName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 0;">
                          <p style="margin: 0 0 4px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #555555; font-family: 'JetBrains Mono', 'SF Mono', monospace;">Email</p>
                          <a href="mailto:${safeEmail}" style="font-size: 16px; color: #ffffff; text-decoration: none; border-bottom: 1px solid #333333;">${safeEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 36px;">
                    <div style="height: 1px; background-color: #1a1a1a;"></div>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 28px 36px 36px 36px;">
                    <p style="margin: 0 0 12px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #555555; font-family: 'JetBrains Mono', 'SF Mono', monospace;">Message</p>
                    <div style="background-color: #111111; border: 1px solid #1a1a1a; border-radius: 8px; padding: 20px;">
                      <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #d4d4d4; word-break: break-word;">${safeMessage}</p>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 28px 0 0 0;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #444444; font-family: 'JetBrains Mono', 'SF Mono', monospace; letter-spacing: 1px;">
                ${dateStr} · ${timeStr}
              </p>
              <p style="margin: 0; font-size: 11px; color: #333333;">
                Sent from <a href="https://thanas.dev" style="color: #666666; text-decoration: none; border-bottom: 1px solid #333333;">thanas.dev</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { name, email, message, username, location } = await req.json();

    // Honeypot spam check
    if (username || location) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const htmlContent = buildEmailHtml(name, email, message);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['thanas5.rd@gmail.com'],
        subject: `${name} - Portfolio Contact`,
        html: htmlContent,
        reply_to: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
