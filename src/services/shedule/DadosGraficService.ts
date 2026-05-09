// services/dashboard/GetWeeklyRevenueService.ts

import prismaClient from "../../prisma";

interface RevenueRequest {
  user_id: string;
}

class DadosGraficService {
  async execute({ user_id }: RevenueRequest) {

    const today = new Date();

    // início da semana
    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - today.getDay());
    firstDay.setHours(0, 0, 0, 0);

    // final da semana
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    lastDay.setHours(23, 59, 59, 999);

    // buscar pedidos
    const orders = await prismaClient.service.findMany({
      where: {
        user_id,
        created_at: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      select: {
        haircut: true,
        created_at: true,
      },
    });

    const weeklyData = [
      { name: "Dom", Total: 0 },
      { name: "Seg", Total: 0 },
      { name: "Ter", Total: 0 },
      { name: "Qua", Total: 0 },
      { name: "Qui", Total: 0 },
      { name: "Sex", Total: 0 },
      { name: "Sab", Total: 0 },
    ];

    orders.forEach((order) => {

      const day = new Date(order.created_at).getDay();

      weeklyData[day].Total += Number(order.haircut.price);

    });

    return weeklyData;
  }
}

export { DadosGraficService };