import prismaClient from "../../prisma";

class ReadNotificationService {
  async execute(id: string) {
    const notification = await prismaClient.notification.update({
      where: { id },
      data: {
        read: true,
      },
    });

    return notification;
  }
}

export { ReadNotificationService };