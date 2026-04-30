import prismaClient from "../../prisma";

interface PropsNot{
  user_id: string

}

class ListNotificationService {
  async execute({user_id}: PropsNot) {
    const notification = await prismaClient.notification.findMany({
      where: { user_id }
    });

    return notification;
  }
}

export { ListNotificationService };