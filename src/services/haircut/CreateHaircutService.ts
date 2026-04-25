import prismaClient from "../../prisma";


interface HaircurRequest{
    user_id: string;
    name: string;
    price: number;
}




class CreateHaircutService{
    async execute({ user_id, name, price}: HaircurRequest){

        if(!name || !price){
            throw new Error()
        }

        //Verificar quantos modelos esse usuário já tem cadastrado
       const myHaircut = await prismaClient.haircut.count({
        where:{
            user_id:user_id
        }
       })

       //Verificar se ele é premium se não limitamos a quantidade de modelos
       
       const user = await prismaClient.user.findFirst({
        where:{
            id: user_id,
        },
        include:{
            subscriptions: true,
        }
       })
      
       //validação ou limites
       if(myHaircut >= 3 && user?.subscriptions?.status !== 'active'){
        throw new Error("Not authorized")
       }

        const haircut = await prismaClient.haircut.create({
            data:{
                user_id:user_id,
                name:name,
                price: price
            }
        })

        return haircut;

    }
}


export { CreateHaircutService }