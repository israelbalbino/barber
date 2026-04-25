import { Request, Response } from "express";
import { CountService } from "../../services/shedule/CountService";

class CountController{
    async handle(request:Request, response:Response){

        const user_id = request.user_id;
        const data = request.query.data as string;
        

        const Countservice = new CountService;

        const count = await Countservice.execute({
            user_id,
            data
     
        })

        return response.json(count)

    }
}

export {CountController}