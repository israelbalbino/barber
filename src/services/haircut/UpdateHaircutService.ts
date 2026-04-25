import prismaClient from '../../prisma';


interface HaircurRequest{
    user_id: string;
    haircut_id:string;
    status: boolean | string;
    name: string;
    price: number;
}


class UpdateHaircut{
    async execute({user_id, haircut_id,status, name, price}: HaircurRequest){

        const user = await prismaClient.user.findFirst({
            where:{
                id:user_id,
            },
            include:{
                subscriptions:true,
            }
        })

        if(user?.subscriptions?.status !== 'active'){
            throw new Error("Not authozition")
        }

        const haircut = await prismaClient.haircut.update({
            where:{
                id:haircut_id
            },
            data:{
                status:status === true ? true : false,
                name:name,
                price:price
            }
        })

        return haircut;

    }
}

export { UpdateHaircut }