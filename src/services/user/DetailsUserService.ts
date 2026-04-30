import prismaClient from "../../prisma";

class DetailsUserService{
    async execute(user_id: string){

        const user = await prismaClient.user.findFirst({

            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                delete_avatar_url:true,
                avatar:true,
                email: true,
                client:true,
                endereco:true,
                subscriptions:{
                    select:{
                        id:true,
                        priceId:true,
                        status:true,
                    }
                }
            }

        })
        return user;
    }
}

export { DetailsUserService }