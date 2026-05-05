import prismaClient from "../../prisma";

interface NewScheduleServiceRequest{
    user_id: string;
    haircut_id: string;
    customer: string;
    avatar: string;
}

class NewClientService{
    async execute({ user_id, haircut_id, customer, avatar}: NewScheduleServiceRequest){
      
        if(customer === '' || haircut_id === ''){
            throw new Error("Error shedule new service")
        }

        const shedule = await prismaClient.service.create({
           data:{
            customer,
            haircut_id,
            user_id,
            avatar
           }
        })

        return shedule;

    }
}

export { NewClientService }