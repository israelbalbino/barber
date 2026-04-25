import { Request, Response } from "express";
import { FishBtnEspService } from "../../services/shedule/FishBtnEspService";


class FishBtnEspController{
    async handle(request:Request, response:Response){

        const user_id = request.body.user_id;

   
       

        const fishService = new FishBtnEspService;

        const fish = await fishService.execute({
            user_id
        })

        // 🔥 dispara atualização em tempo real
        const io = request.app.get("io");

         io.emit("servicos_atualizados");

        return response.json(fish)

    }
}

export { FishBtnEspController }