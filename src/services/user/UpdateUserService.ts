import prismaClient from '../../prisma';

interface UserRequest{
    user_id: string;
    name: string;
    endereco: string;
}

class UpdateUserServide{
    async execute({user_id, name, endereco}:UserRequest){

        try {
            const userAlreadyExists = await prismaClient.user.findFirst({
                where:{
                    id: user_id,
                }
                
            })

            if(!userAlreadyExists){
                throw new Error("User not exists!")
            }

           const userUpdate = await prismaClient.user.update({
            where:{
                id: user_id
            },
            data:{
                name,
                endereco
            },
            select:{
                name:true,
                email:true,
                endereco:true
            }
           })

           return userUpdate;


        } catch (error) {
            throw new Error("Error ao atualizar informações")
        }

    }
}

export { UpdateUserServide }