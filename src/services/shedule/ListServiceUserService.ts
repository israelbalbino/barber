

import prismaClient from "../../prisma";


interface ListscheduleRequest{
    user_id: string;
    status: boolean | string;
    barbeid:string;

 
   
}

class ListServiceUserService{
    async execute({user_id, barbeid, status} : ListscheduleRequest){

     

        const listSchedule = await prismaClient.service.findMany({
            where: {
              user_id: barbeid,
              
              status:status === 'true' ? true : false,
              
            },
            take: 3, // 👈 aqui
  orderBy: {
    created_at: 'asc'
  },
            select:{
                id:true,
                created_at:true,
                customer:true,
                status:true,
                haircut:true,
                avatar:true
            }
          });

        return listSchedule;

    }
}

export { ListServiceUserService }