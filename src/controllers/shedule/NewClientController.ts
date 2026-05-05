import { Request, Response } from "express";
import { NewClientService } from "../../services/shedule/NewClientService";
import { Server as IOServer } from "socket.io";



class NewClientController{

    async handle(request:Request, response:Response){

        const { haircut_id, customer, user_id, avatar} = request.body;
       
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(customer)}&background=D4AF37&color=000`;

        const finalAvatar = avatar && avatar !== "" ? avatar : defaultAvatar;

        const newShedule = new NewClientService;

        const shedule = await newShedule.execute({
            user_id,
            haircut_id,
            customer,
            avatar:finalAvatar
        })

          // 🔥 dispara atualização em tempo real
          const io = request.app.get("io");

          io.emit("novo_servico", shedule);
       

        return response.json(shedule)

    }
}

export { NewClientController }