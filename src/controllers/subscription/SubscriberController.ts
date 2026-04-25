import { Request, Response } from "express";


import { SubscriberService } from '../../services/subscriptions/SubscriberService';


class SubscriberController{
    async handle(request:Request, response: Response){
        const user_id = request.user_id;

        const subscriberService = new SubscriberService();

        const Subscribe = await subscriberService.execute({
            user_id
        })

        return response.json(Subscribe)
    }
}

export {SubscriberController};