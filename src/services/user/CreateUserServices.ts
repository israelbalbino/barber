import prismaClient from '../../prisma';
import {hash} from "bcryptjs"

interface UserRequest{
    name: string;
    email: string;
    password: string;
    client: string;
}


class CreateUserServices{

    async execute({ name, email, password, client }: UserRequest){

        
        //verifica se o email foi passado no corpo da requisição,se não foi exibie uma mensagem de erro

        if(!email){
            throw new Error("Email incorreto!")
        }

        //verifica no banco de dados se esse email já existe

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        //se existe então exibe um erro email existe

        if(userAlreadyExists){
            throw new Error("Email já existe!")
        }
       
        //codifica a senha enviada pelo corpo da requisição
        const passwordHash = hash(password, 8)

         
        //cadastra o usuario no banco de dados e so retorna id,name,email
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email:email,
                password: await passwordHash,
                client: client
            },
            select:{
                id: true,
                name: true,
                email: true,
                client: true
            }
        })

        


        return user;
    }
}

export { CreateUserServices }