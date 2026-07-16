import { NextRequest, NextResponse } from "next/server";
import { saveContact } from "@/lib/dynamo";
import { ses } from "@/lib/aws";
import { SendEmailCommand } from "@aws-sdk/client-ses";

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "";
const NOTIFY_EMAIL = process.env.SES_NOTIFY_EMAIL || "eryon.mx@outlook.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const submission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      name,
      email,
      company: company || "",
      projectType: projectType || "",
      budget: budget || "",
      timeline: timeline || "",
      message,
      createdAt: new Date().toISOString(),
    };

    await saveContact(submission);

    if (FROM_EMAIL) {
      try {
        await ses.send(
          new SendEmailCommand({
            Source: FROM_EMAIL,
            Destination: { ToAddresses: [NOTIFY_EMAIL] },
            Message: {
              Subject: { Data: `Nuevo contacto: ${name} - ${company || "Sin empresa"}` },
              Body: {
                Html: {
                  Data: `
                    <h2>Nueva solicitud de contacto</h2>
                    <table style="border-collapse:collapse;width:100%">
                      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
                      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
                      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Empresa</td><td style="padding:8px;border:1px solid #ddd">${company || "-"}</td></tr>
                      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Tipo de Proyecto</td><td style="padding:8px;border:1px solid #ddd">${projectType || "-"}</td></tr>
                      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Presupuesto</td><td style="padding:8px;border:1px solid #ddd">${budget || "-"}</td></tr>
                      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Tiempo</td><td style="padding:8px;border:1px solid #ddd">${timeline || "-"}</td></tr>
                    </table>
                    <h3>Mensaje:</h3>
                    <p style="background:#f5f5f5;padding:12px;border-radius:8px">${message}</p>
                    <hr>
                    <p style="color:#666;font-size:12px">Enviado el ${new Date().toLocaleString("es-MX")}</p>
                  `,
                },
              },
            },
          })
        );
      } catch (emailErr) {
        console.error("SES email error:", emailErr);
      }
    } else {
      console.log("Contact form submission (SES not configured):", submission);
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
