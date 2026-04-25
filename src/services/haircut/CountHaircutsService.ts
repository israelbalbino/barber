import prismaClient from "../../prisma";

interface CountRequest{
    user_id:string;
}

class CountHaircutsService{
    async execute({user_id}: CountRequest){

        const Count = await prismaClient.haircut.count({
            where:{
                user_id: user_id
            }
        })

        return Count;

    }
}

export { CountHaircutsService }