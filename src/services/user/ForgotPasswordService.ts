


import prismaClient from "../../prisma";
import crypto from "crypto";
import { resend } from "../../lib/resend";

interface Request {
  email: string;
}

class ForgotPasswordService {
  async execute({ email }: Request) {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      // 🔒 segurança: não revela se existe ou não
      return { message: "Se o email existir, enviaremos um link" };
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1h

    await prismaClient.user.update({
      where: { email },
      data: {
        resetToken: code,
        resetTokenExpiry: new Date(Date.now() + 1000 * 60 * 10), // 10 min
      },
    });

    const resetLink = `${process.env.APP_URL}/reset-password?token=${code}`;

    // 🔥 EMAIL REAL
    await resend.emails.send({
      from: 'AraBarberPRO <no-reply@arabarber.pro>',
      to: user.email,
      subject: "Código de recuperação",
      html: `
        <div style="
          font-family: -apple-system, sans-serif;
          background:#0a0a0a;
          padding:40px;
          color:#fff;
          text-align:center;
        ">
    
          <h2 style="color:#D4AF37;margin-bottom:20px">
            AraBarberPRO
          </h2>
    
          <p style="color:#aaa">
            Use o código abaixo para redefinir sua senha:
          </p>
    
          <div style="
            margin:30px auto;
            font-size:32px;
            letter-spacing:8px;
            font-weight:bold;
            color:#D4AF37;
          ">
            ${code}
          </div>
    
          <p style="font-size:12px;color:#666">
            Esse código expira em 10 minutos
          </p>
    
        </div>
      `,
    });

    return { message: "Email enviado com sucesso" };
  }
}

export { ForgotPasswordService };