import prismaClient from "../../prisma";


interface ListscheduleRequest{
    user_id: string;
    status: boolean | string;
    data: Date | string;
   
}

class DataAtualService{
    async execute({user_id, status, data} : ListscheduleRequest){

      const baseDate = data ? new Date(data) : new Date();

      console.log(baseDate)


      // início do dia
      const startOfDay = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        0, 0, 0
      );
  
      // fim do dia
      const endOfDay = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        23, 59, 59, 999
      );

        const listSchedule = await prismaClient.service.findMany({
            where: {
              user_id: user_id,
              
              status:status === 'true' ? true : false,
                        // 👇 FILTRO DO DIA ATUAL
            created_at: {
            gte: startOfDay,
            lte: endOfDay,
          },
              
            },
            take: 4, // 👈 aqui
  orderBy: {
    created_at: 'asc'
  },
            select:{
                id:true,
                customer:true,
                status:true,
                haircut:true
            }
          });

        return listSchedule;

    }
}

export { DataAtualService }