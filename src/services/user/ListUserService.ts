import prismaClient from "../../prisma";

interface ListUserRequest{
    user_id:string;
}

class ListUserService{
    async execute({user_id}: ListUserRequest){

         //verifica no banco de dados se esse email já existe

         const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })

        //se existe então exibe um erro email existe

        if(!userAlreadyExists){
            throw new Error("usuario não existe!")
        }
       

        const listUser = await prismaClient.user.findMany({
            select:{
                id:true,
                name:true,
                avatar:true,
                created_at:true,
                client:true,
                endereco:true,
                subscriptions:true
            }
        });

        return listUser;

    }
}

export { ListUserService }