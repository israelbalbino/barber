import { Request, Response } from "express";
import { ListServiceUser } from "../../services/shedule/ListServiceUser";

class ListServiceController{
    
    async handle(request:Request, response:Response){

        
        const user_id = request.user_id;
        const barbeid = request.query.barbeid as string;



        const listSchedule = new ListServiceUser;

        const shedule = await listSchedule.execute({user_id, barbeid})

        return response.json(shedule);

    }
}

export { ListServiceController }