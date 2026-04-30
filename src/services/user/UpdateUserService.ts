import prismaClient from "../../prisma";


interface UserRequest {
  user_id: string;
  name?: string;
  avatar?: string;
  endereco?: string;
  delete_avatar_url?: string;
}

class UpdateUserService {
  async execute({
    user_id,
    name,
    avatar,
    endereco,
    delete_avatar_url,
  }: UserRequest) {

    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error("User not exists!");
    }

    // 🔥 verifica se mudou imagem
    const changedAvatar =
      avatar &&
      user.avatar &&
      avatar !== user.avatar;

    // 🔥 deleta antiga SOMENTE depois do upload novo existir
    if (changedAvatar && user.delete_avatar_url) {
      try {
        const res = await fetch(user.delete_avatar_url, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });
        
        console.log("STATUS:", res.status);
        console.log("Imagem antiga deletada");
      } catch (err) {
        console.log("Erro ao deletar imagem antiga:", err);
      }
    }

    // 🔥 update
    const updatedUser = await prismaClient.user.update({
      where: { id: user_id },
      data: {
        name,
        endereco,
        ...(avatar && { avatar }),
        ...(delete_avatar_url && { delete_avatar_url }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        endereco: true,
        avatar: true,
        delete_avatar_url: true,
      },
    });

    return updatedUser;
  }
}

export { UpdateUserService };