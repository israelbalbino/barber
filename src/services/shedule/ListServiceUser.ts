import prismaClient from "../../prisma";


interface ListUserRequest{
 
    user_id:string;
    userId:string;
}

class ListServiceUser{

    async execute({user_id,userId}:ListUserRequest){

     

         if(!user_id){
            throw new Error("Not authorization")
         }
    

          //Verificar se barbearia é premium se não o usuario pode ser premium
       
          const userIds = await prismaClient.user.findFirst({
            where:{
                id: user_id,
            },
            include:{
                subscriptions: true,
            }
           })
      

      // verificar se o usuario é premium se não o usuario precisa ser ou a barbearia
       const user = await prismaClient.user.findFirst({
        where:{
            id: userId,
        },
        include:{
           
            subscriptions: true,
        }
       })
 
         //validação ou limites
         if(user?.subscriptions?.status !== 'active' && userIds?.subscriptions?.status !== 'active'){
            throw new Error("Not authorized")
           }


        const listSchedule = await prismaClient.service.count({
            where:{

                user_id:user_id,
                status: true
            }
        })

        return listSchedule;

    }
}

export { ListServiceUser }