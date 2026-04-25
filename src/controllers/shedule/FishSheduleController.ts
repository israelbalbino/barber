import { Request, Response } from "express";
import { FishSheduleService } from "../../services/shedule/FishSheduleService";


class FishSheduleController{
    async handle(request:Request, response:Response){

        const user_id = request.user_id;
        const schedule_id  = request.query.schedule_id as string;

        const fishService = new FishSheduleService;

        const fish = await fishService.execute({
            schedule_id,
            user_id
        })

        // 🔥 dispara atualização em tempo real
        const io = request.app.get("io");

         io.emit("servicos_atualizados");

        return response.json(fish)

    }
}

export { FishSheduleController }