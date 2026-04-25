import { Request, Response } from "express";
import { TotalService } from "../../services/shedule/TotalService";

class TotalServiceController{
    
    async handle(request:Request, response:Response){

        const user_id = request.user_id;
        const status = request.query.status as string;
        const data = request.query.data as string;
     
  

        const listSchedules = new TotalService;

        const shedule = await listSchedules.execute({
            user_id, 
            status,
            data
         
        })

        return response.json(shedule);

    }
}

export { TotalServiceController }