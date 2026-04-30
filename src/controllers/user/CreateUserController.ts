import { Request, Response } from "express";

import { CreateUserServices } from "../../services/user/CreateUserServices";

class CreateUserController{

    async handle( request:Request, response:Response ) {

        const {name, avatar, email, password,client } = request.body;

        const createUserService = new CreateUserServices();

        const user = await createUserService.execute({
            name,
            avatar,
            email,
            password,
            client
        })

        return response.json(user)

    }
}


export { CreateUserController }