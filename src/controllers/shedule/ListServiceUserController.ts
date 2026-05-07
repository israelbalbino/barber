import { Request, Response } from "express";
import { ListServiceUserService } from "../../services/shedule/ListServiceUserService";

class ListServiceUserController{
    
    async handle(request:Request, response:Response){

        const user_id = request.user_id;
        const barbeid = request.query.barbeid as string;
        const status = request.query.status as string;
        
        
       

        const listSchedules = new ListServiceUserService;

        const shedule = await listSchedules.execute({
            user_id, 
            barbeid,
            status

        })

      

        return response.json(shedule);

    }
}

export { ListServiceUserController }