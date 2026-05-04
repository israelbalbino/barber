import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";

interface Request {
  token: string;
  password: string;
}

class ResetPasswordService {
  async execute({ token, password }: Request) {
    const user = await prismaClient.user.findFirst({
      where: { resetToken: token },
    });

    if (!user) {
      throw new Error("Token inválido");
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new Error("Token expirado");
    }

    const hash = await bcrypt.hash(password, 10);

    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        password: hash,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: "Senha atualizada" };
  }
}

export { ResetPasswordService };