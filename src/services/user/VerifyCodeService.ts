import prismaClient from "../../prisma";

class VerifyCodeService {
    async execute({ email, token }: { email: string; token: string }) {
  
      const user = await prismaClient.user.findFirst({
        where: {
          email,
          resetToken: token,
          resetTokenExpiry: {
            gt: new Date(),
          },
        },
      });
  
      if (!user) {
        throw new Error("Código inválido ou expirado");
      }
  
      return { valid: true };
    }
  }

  export { VerifyCodeService }