import prismaClient from "../../prisma";


interface DetailsRequest{
    haircut_id: string;
}

class DetailsHaircutsService{
    async execute({haircut_id}: DetailsRequest){

        const Details = await prismaClient.haircut.findFirst({
            where:{
                id: haircut_id
            }
        })

        return Details;

    }
}

export { DetailsHaircutsService }