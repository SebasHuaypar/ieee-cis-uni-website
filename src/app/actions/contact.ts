"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const email = formData.get("email") as string;
  const asunto = formData.get("asunto") as string;
  const mensaje = formData.get("mensaje") as string;

  if (!nombre || !email || !asunto || !mensaje) {
    return { success: false, error: "Todos los campos son obligatorios." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const headerUrl = process.env.EMAIL_HEADER_IMAGE_URL;

  // Estilos CSS compartidos (Dark Theme)
  const darkStyle = `
    background-color: #0b0f1a;
    color: #ffffff;
    font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 40px 20px;
  `;

  const cardStyle = `
    max-width: 600px;
    margin: 0 auto;
    background-color: #161b2a;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  `;

  // --- PLANTILLA 1: PARA EL EQUIPO (NOTIFICACIÓN) ---
  const teamHtml = `
    <div style="${darkStyle}">
      <div style="${cardStyle}">
        <div style="background: #000; text-align: center;">
          <img src="${headerUrl}" style="width: 100%; display: block;" alt="IEEE CIS UNI Header">
        </div>
        <div style="height: 4px; background: #066bf3;"></div>
        <div style="padding: 40px;">
          <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">Nueva consulta recibida</h2>
          <p style="color: #8b9bb4; font-size: 16px; margin-bottom: 30px;">Se ha registrado un nuevo mensaje a través del formulario de contacto del sitio web.</p>
          
          <div style="margin-bottom: 25px;">
            <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #066bf3; font-weight: bold; margin-bottom: 5px;">Remitente</div>
            <div style="font-size: 16px; color: #ffffff;"><strong>${nombre}</strong></div>
            <div style="font-size: 14px; color: #8b9bb4;">${email}</div>
          </div>
          
          <div style="margin-bottom: 25px;">
            <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #066bf3; font-weight: bold; margin-bottom: 5px;">Asunto</div>
            <div style="font-size: 16px; color: #ffffff;">${asunto}</div>
          </div>
          
          <div style="padding: 25px; background: rgba(6, 107, 243, 0.05); border-radius: 16px; border: 1px solid rgba(6, 107, 243, 0.2); color: #e2e8f0; font-size: 15px; line-height: 1.6;">
            ${mensaje.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div style="padding: 30px; background: #111625; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05);">
          <p style="font-size: 14px; color: #ffffff; font-weight: bold; margin: 0 0 5px 0;">IEEE CIS UNI</p>
          <p style="font-size: 11px; color: #4a5568; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Gestión de Contacto Institucional</p>
        </div>
      </div>
    </div>
  `;

  // --- PLANTILLA 2: PARA EL USUARIO (CONFIRMACIÓN) ---
  const userHtml = `
    <div style="${darkStyle}">
      <div style="${cardStyle}">
        <div style="background: #000; text-align: center;">
          <img src="${headerUrl}" style="width: 100%; display: block;" alt="IEEE CIS UNI Header">
        </div>
        <div style="height: 4px; background: #066bf3;"></div>
        <div style="padding: 40px; text-align: center;">
          <h2 style="margin: 0 0 15px 0; font-size: 28px; font-weight: 900; letter-spacing: -1px;">Hola, ${nombre}</h2>
          <p style="color: #e2e8f0; font-size: 18px; line-height: 1.6; margin-bottom: 25px;">
            Confirmamos la recepción de tu mensaje.
          </p>
          <p style="color: #8b9bb4; font-size: 15px; line-height: 1.6; margin-bottom: 35px;">
            Gracias por contactar con el capítulo <strong>IEEE CIS UNI</strong>. Nuestro equipo revisará tu consulta sobre "<em>${asunto}</em>" y te responderá a la brevedad.
          </p>
          
          <div style="display: inline-block; padding: 14px 30px; background: #066bf3; border-radius: 14px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
            Consulta en proceso
          </div>
        </div>
        <div style="padding: 40px; background: #111625; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05);">
          <div style="margin-bottom: 20px;">
            <a href="${process.env.NEXT_PUBLIC_LINKEDIN_URL}" style="color: #066bf3; text-decoration: none; margin: 0 10px; font-size: 12px; font-weight: bold;">LinkedIn</a>
            <a href="${process.env.NEXT_PUBLIC_INSTAGRAM_URL}" style="color: #066bf3; text-decoration: none; margin: 0 10px; font-size: 12px; font-weight: bold;">Instagram</a>
            <a href="${process.env.NEXT_PUBLIC_FACEBOOK_URL}" style="color: #066bf3; text-decoration: none; margin: 0 10px; font-size: 12px; font-weight: bold;">Facebook</a>
          </div>
          <p style="font-size: 12px; color: #8b9bb4; margin: 0 0 5px 0; font-weight: bold;">IEEE Computational Intelligence Society - UNI</p>
          <p style="font-size: 11px; color: #4a5568; margin: 0;">Este es un mensaje automático, no es necesario responder.</p>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Portal Web IEEE CIS" <${process.env.SMTP_EMAIL}>`,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: email,
      subject: `[Nueva Consulta] ${asunto} - ${nombre}`,
      html: teamHtml,
    });

    await transporter.sendMail({
      from: `"IEEE CIS UNI" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `Confirmación de mensaje recibido - ${nombre}`,
      html: userHtml,
    });

    return { success: true };
  } catch (error) {
    console.error("Error en el envío de emails:", error);
    return { success: false, error: "Error al enviar el mensaje. Intenta de nuevo más tarde." };
  }
}
