import prismaClient from "../../prisma";


interface ListUserRequest{
 
    user_id:string;
    barbeid:string;
}

class ListServiceUser{

    async execute({user_id, barbeid}:ListUserRequest){

     

         if(!user_id){
            throw new Error("Not authorization")
         }
    

        const listSchedule = await prismaClient.service.count({
            where:{

                user_id:barbeid,
                status: true
            }
        })

        return listSchedule;

    }
}

export { ListServiceUser }