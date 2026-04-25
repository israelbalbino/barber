import prismaClient from "../../prisma";


interface ListscheduleRequest{
    user_id: string;
    status: boolean | string;
    data: Date | string;
   
}

class TotalService{
    async execute({user_id, status, data} : ListscheduleRequest){

        const today = data ? new Date(data) : new Date();

        // início do dia
        const startOfDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0, 0, 0
        );
    
        // fim do dia
        const endOfDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23, 59, 59
        );

   

        const listSchedule = await prismaClient.service.findMany({
            where: {

             
             user_id:user_id,
             status:status === 'true' ? true : false,
              // 👇 FILTRO DO DIA ATUAL
        updated_at: {
            gte: startOfDay,
            lte: endOfDay,
          },
            
             
             
            },
            select:{
                id:true,
                customer:true,
                haircut:true
            }
          });

          // somando os preços
const total = listSchedule.reduce((acc, item) => {
    return acc + item.haircut.price;
  }, 0);
  
        

        return total;

    }
}

export { TotalService }