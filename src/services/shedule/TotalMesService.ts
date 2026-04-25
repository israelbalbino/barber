import prismaClient from "../../prisma";

interface ListscheduleRequest {
  user_id: string;
  status: boolean | string;
  datainicial?: Date | string;
  datafinal?: Date | string;
}

class TotalMesService {
  async execute({ user_id, status, datainicial, datafinal }: ListscheduleRequest) {

    const today = new Date();

    // ✅ Se não vier data → usa mês atual
      // ✅ Se não vier data → usa mês atual
      const start = datainicial
      ? new Date(new Date(datainicial).setHours(0, 0, 0, 0))
      : new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
    
    const end = datafinal
      ? new Date(new Date(datafinal).setHours(23, 59, 59, 999))
      : new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    const listSchedule = await prismaClient.service.findMany({
      where: {
        user_id: user_id,
        status: status === 'true' ? true : false,
        created_at: {
          gte: start,
          lte: end,
        },
      },
      select: {
        haircut: {
          select: {
            price: true,
          },
        },
      },
    });

    const total = listSchedule.reduce((acc, item) => {
      return acc + item.haircut.price;
    }, 0);

    return total;
  }
}

export { TotalMesService };