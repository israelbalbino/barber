import prismaClient from "../../prisma";

interface NewScheduleServiceRequest{
    user_id: string;
    haircut_id: string;
    customer: string;
}

class NewScheduleService{
    async execute({ user_id, haircut_id, customer }: NewScheduleServiceRequest){
      
        if(customer === '' || haircut_id === ''){
            throw new Error("Error shedule new service")
        }

        const shedule = await prismaClient.service.create({
           data:{
            customer,
            haircut_id,
            user_id
           }
        })

        return shedule;

    }
}

export { NewScheduleService }