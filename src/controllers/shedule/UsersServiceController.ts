import { Request, Response } from "express";
import { UserService } from "../../services/shedule/UsersService";

class UsersServiceController{
    async handle(request:Request, response:Response){

        const user_id = request.query.user_id as string;

        const Countservice = new UserService;

        const count = await Countservice.execute({
            user_id
        })

        return response.json(count)

    }
}

export { UsersServiceController}