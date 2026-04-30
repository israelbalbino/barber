import prisma from "../../prisma";

interface RequestProps {
  status?: boolean;
  page?: number;
  limit?: number;
  user_id: string;
}



 class ListHaircutsService {
  async execute({ status, page = 1, limit = 4, user_id }: RequestProps) {
    const limitNumber = Math.min(Math.max(limit, 1), 20);
    const pageNumber = Math.max(page, 1);

    const skip = (pageNumber - 1) * limitNumber;

    // 🔥 monta o where corretamente (sem status inicialmente)
    const where: any = {
      user_id,
    };

    // 🔥 só adiciona status se existir
    if (status !== undefined) {
      where.status = status;
    }

    // 🔥 paralelo (performance)
    const [haircuts, total] = await Promise.all([
      prisma.haircut.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: {
          created_at: "desc",
        },
      }),
      prisma.haircut.count({ where }),
    ]);

    const hasMore = skip + haircuts.length < total;

    return {
      data: haircuts,
      hasMore,
      page: pageNumber,
      total,
    };
  }
}

export {ListHaircutsService}