import prismaClient from "../../prisma";

interface PropsNot{
  user_id: string;
  read:boolean;

}

class CountNotificationService {
  async execute({user_id, read}: PropsNot) {
    const notification = await prismaClient.notification.count({
      where: { user_id,read:false }
      
      
    });

    return notification;
  }
}

export { CountNotificationService };