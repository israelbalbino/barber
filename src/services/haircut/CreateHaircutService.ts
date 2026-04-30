import prismaClient from "../../prisma";

interface HaircutRequest {
  user_id: string;
  name: string;
  price: number;
}

class CreateHaircutService {
  async execute({ user_id, name, price }: HaircutRequest) {
    if (!name || price === undefined) {
      throw new Error("Nome e preço são obrigatórios");
    }

    // 🔥 conta corretamente os cortes do usuário
    const totalHaircuts = await prismaClient.haircut.count({
      where: {
        user_id,
      },
    });

    console.log(totalHaircuts)

    // 🔥 busca usuário com assinatura
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPremium = user.subscriptions?.status === "active";

    // 🔥 regra de limite
    if (totalHaircuts >= 3 && !isPremium) {
      throw new Error(
        "Limite de cortes atingido. Faça upgrade para continuar."
      );
    }

    // 🔥 cria haircut
    const haircut = await prismaClient.haircut.create({
      data: {
        user_id,
        name,
        price,
      },
    });

    return haircut;
  }
}

export { CreateHaircutService };