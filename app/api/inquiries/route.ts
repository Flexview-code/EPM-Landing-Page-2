import { env } from "cloudflare:workers";
import { z } from "zod";
const schema = z.object({
 audience: z.enum(["design-partner", "investor"]),
 name: z.string().trim().min(2).max(100),
 email: z.string().trim().email().max(254),
 organization: z.string().trim().min(2).max(150),
 role: z.string().max(80).optional(),
 portfolio: z.string().max(40).optional(),
 message: z.string().trim().max(2000).optional(),
 consent: z.literal("yes"),
 website: z.string().max(200).optional(),
}).superRefine((data, ctx) => {
 if (data.audience === "design-partner" && (!data.role || !data.portfolio)) ctx.addIssue({code:"custom", message:"Please select your role and portfolio size."});
});
export async function POST(request: Request) {
 const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
 const origin = request.headers.get("origin");
 if (origin && origin !== new URL(request.url).origin) return json({error:"Please submit your inquiry from the EasyPM website."},403);
 if (!request.headers.get("content-type")?.includes("application/json")) return json({error:"Unsupported request format."},415);
 if (Number(request.headers.get("content-length") || 0) > 12000) return json({error:"Your inquiry is too long."},413);
 let body: unknown;
 try { const raw = await request.text(); if(raw.length>12000)return json({error:"Your inquiry is too long."},413); body=JSON.parse(raw); } catch { return json({error:"Please check your details and try again."},400); }
 const result=schema.safeParse(body);
 if(!result.success)return json({error:"Please check your name, email, organization, and consent, then try again."},400);
 const data=result.data;
 if(data.website)return json({ok:true});
 if(!env.DB)return json({error:"The inquiry form is temporarily unavailable. Please try again shortly."},503);
 try {
  const email=data.email.toLowerCase();
  const recent=await env.DB.prepare("SELECT id FROM inquiries WHERE email = ? AND audience = ? AND created_at > ? LIMIT 1").bind(email,data.audience,new Date(Date.now()-60000).toISOString()).first();
  if(recent)return json({ok:true});
  await env.DB.prepare("INSERT INTO inquiries (id, audience, name, email, organization, role, portfolio, message, consent_version, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(crypto.randomUUID(),data.audience,data.name,email,data.organization,data.role||null,data.portfolio||null,data.message||null,"contact-inquiry-2026-10-19",new Date().toISOString()).run();
  return json({ok:true},201);
 } catch { return json({error:"We couldn’t save your inquiry. Please try again in a moment."},503); }
}
