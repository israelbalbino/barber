import { Request, Response } from "express";
import { NewClientService } from "../../services/shedule/NewClientService";
import { Server as IOServer } from "socket.io";



class NewClientController{

    async handle(request:Request, response:Response){

        const { haircut_id, customer, user_id, avatar} = request.body;
       
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(customer)}&background=D4AF37&color=000`;


        console.log(avatar)

        const newShedule = new NewClientService;

        const shedule = await newShedule.execute({
            user_id,
            haircut_id,
            customer,
            avatar:avatar.avatar && avatar.avatar !== "" ? avatar.avatar : defaultAvatar
        })

          // 🔥 dispara atualização em tempo real
          const io = request.app.get("io");

          io.emit("novo_servico", shedule);
       

        return response.json(shedule)

    }
}

export { NewClientController }