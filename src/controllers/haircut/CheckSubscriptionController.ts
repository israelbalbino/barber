import { Request, Response } from "express";
import { CheckSubscriptionService } from "../../services/haircut/CheckSubscriptionService";

class CheckSubscriptionController{
    async handle(request:Request, response:Response){

        const user_id = request.user_id;

        const checkService = new CheckSubscriptionService;

        const check = await checkService.execute({
            user_id
        })

        return response.json(check)

    }
}

export {CheckSubscriptionController}