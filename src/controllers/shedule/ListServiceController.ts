import { Request, Response } from "express";
import { ListServiceUser } from "../../services/shedule/ListServiceUser";

class ListServiceController{
    
    async handle(request:Request, response:Response){

        
        const user_id = request.query.user_id as string;
        const userId = request.user_id;



        const listSchedule = new ListServiceUser;

        const shedule = await listSchedule.execute({user_id,userId})

        return response.json(shedule);

    }
}

export { ListServiceController }