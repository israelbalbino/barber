import { Request, Response } from "express";
import { NewScheduleService } from "../../services/shedule/NewScheduleService";
import { Server as IOServer } from "socket.io";



class NewScheduleController{

    async handle(request:Request, response:Response){

        const { haircut_id, customer, avatar } = request.body;
        const user_id = request.user_id;

        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(customer)}&background=D4AF37&color=000`;

        const finalAvatar = avatar && avatar !== "" ? avatar : defaultAvatar;


        const newShedule = new NewScheduleService;

        const shedule = await newShedule.execute({
            user_id,
            haircut_id,
            customer,
            avatar:finalAvatar
        })

          // 🔥 dispara atualização em tempo real
          const io = request.app.get("io");

          io.emit("novo_servico", shedule);
          io.to(user_id).emit("novo_servico", shedule);
       

        return response.json(shedule)

    }
}

export { NewScheduleController }