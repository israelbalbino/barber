import prismaClient from "../../prisma";

interface CountRequest{
    user_id:string;
}

class UserService{
    async execute({user_id}: CountRequest){

        const Count = await prismaClient.service.count({
            where:{
                user_id: user_id
            }
        })

        return Count;

    }
}

export { UserService }