import { Request, Response } from "express";
import { NewClientService } from "../../services/shedule/NewClientService";
import { Server as IOServer } from "socket.io";



class NewClientController{

    async handle(request:Request, response:Response){

        const { haircut_id, customer, user_id } = request.body;
       

        const newShedule = new NewClientService;

        const shedule = await newShedule.execute({
            user_id,
            haircut_id,
            customer
        })

          // 🔥 dispara atualização em tempo real
          const io = request.app.get("io");

          io.emit("novo_servico", shedule);
       

        return response.json(shedule)

    }
}

export { NewClientController }