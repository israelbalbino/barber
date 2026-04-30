import prismaClient from "../../prisma";

interface FishRequest{
    schedule_id:string;
    user_id: string;
}

class FishSheduleService{
    async execute({schedule_id, user_id}: FishRequest){

        if(schedule_id === '' || user_id === ''){
            throw new Error('Error')
        }

        try {
         
            const belongsToUser = await prismaClient.service.findFirst({
                where:{
                    id: schedule_id,
                    user_id:user_id
                }
            })

            if(!belongsToUser){
                throw new Error("Not authorization")
            }

           const res = await prismaClient.service.update({
                where:{
                    id: schedule_id
                },
                data:{
                    status:false
                }
            })


            return res;



        } catch (error) {

            throw new Error(error)
            
        }

    }
}

export { FishSheduleService }