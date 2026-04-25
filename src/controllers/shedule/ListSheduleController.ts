import { Request, Response } from "express";
import { ListScheduleService } from "../../services/shedule/ListScheduleService";

class ListScheduleController{
    
    async handle(request:Request, response:Response){

        const user_id = request.user_id;
        const status = request.query.status as string;



        console.log(status)
       

        const listSchedules = new ListScheduleService;

        const shedule = await listSchedules.execute({
            user_id, 
            status
         
        })

      

        return response.json(shedule);

    }
}

export { ListScheduleController }