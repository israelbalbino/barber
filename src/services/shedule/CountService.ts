import prismaClient from "../../prisma";

interface CountRequest{
    user_id:string;
    data:Date | string;
}

class CountService{
    async execute({user_id,data} : CountRequest){

        
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


        const Count = await prismaClient.service.count({
            where:{

                user_id:user_id,
                status:false,
                          // 👇 FILTRO DO DIA ATUAL
        updated_at: {
            gte: startOfDay,
            lte: endOfDay,
          },
                
                
            }
        })

        return Count;

    }
}

export { CountService }