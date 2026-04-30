import prismaClient from "../../prisma";

interface NotificationRequest {
  user_id: string;
  title: string;
  message?: string;
}

class CreateNotificationService {
  async execute({ user_id, title, message }: NotificationRequest) {
    if (!user_id || !title) {
      throw new Error("Dados inválidos");
    }

    const notification = await prismaClient.notification.create({
      data: {
        user_id,
        title,
        message,
        read: false,
      },
    });

    return notification;
  }
}

export { CreateNotificationService };