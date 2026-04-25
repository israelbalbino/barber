import { Request, Response } from "express";
import { CountMesService } from "../../services/shedule/CountMesService";

class CountMesController{
    
    async handle(request:Request, response:Response){

        const user_id = request.user_id;
        const status = request.query.status as string;
        const datainicial = request.query.datainicial as string;
        const datafinal = request.query.datafinal as string;
    
     
  

        const listSchedules = new CountMesService;

        const shedule = await listSchedules.execute({
            user_id, 
            status,
            datainicial,
            datafinal

          
         
        })

        return response.json(shedule);

    }
}

export { CountMesController }