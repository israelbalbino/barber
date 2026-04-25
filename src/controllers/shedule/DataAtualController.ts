import { DataAtualService } from "../../services/shedule/DataAtualService";


import { Request, Response } from "express";

class DataAtualController{
    
    async handle(request:Request, response:Response){

        const user_id = request.user_id;
        const status = request.query.status as string;
        const data = request.query.data as string;


        console.log(status)
       

        const dataatual = new DataAtualService;

        const shedule = await dataatual.execute({
            user_id, 
            status,
            data
         
        })

        return response.json(shedule);

    }
}

export { DataAtualController }