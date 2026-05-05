import prismaClient  from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface AuthUserRequest{
    email: string;
    password: string;
}


class AuthUserService{

    async execute({ email,password }:AuthUserRequest){

        const user = await prismaClient.user.findUnique({
            where:{
                email:email
            },
            include:{
                subscriptions: true,
            }
        })

        if(!user){
            throw new Error("Email/senha incorretos!")
        }

        const passwordMatch = await compare(password, user?.password)

        if(!passwordMatch){
            throw new Error("Email/senha incorretos!")
        }

        //GERAR UM TOKEN JWT

        const token = sign(
            {
              sub: user.id,
              name: user.name,
              email: user.email,
              jti: crypto.randomUUID(), // 🔥 nível enterprise
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '30d',
            }
          )



        return {

            id: user?.id,
            avatar: user?.avatar,
            name:user?.name,
            email:user?.email,
            client:user?.client,
            endereco:user?.endereco,
            token:token,
            subscription:user.subscriptions ? {
                id: user?.subscriptions?.id,
                status: user?.subscriptions.status
            } : null

    }
}

}

export  {AuthUserService}