import prismaClient from "../../prisma";

interface RequestProps {
  barber_id: string;
}

class ListBusinessHoursService {
  async execute({ barber_id }: RequestProps) {
    const businessHours =
      await prismaClient.businessHours.findMany({
        where: {
          user_id: barber_id,
        },
        orderBy: {
          day: "asc",
        },
      });

    const today = new Date().getDay();

    // Domingo = 0 -> 7
    const currentDay = today === 0 ? 7 : today;

    const todayHours = businessHours.find(
      (item) => item.day === currentDay
    );

    let isOpenNow = false;

    if (todayHours && todayHours.is_open) {
      const now = new Date();

      const currentTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      const isInsideWorkingHours =
        currentTime >= todayHours.open_time &&
        currentTime <= todayHours.close_time;

      const isLunchTime =
        todayHours.lunch_start &&
        todayHours.lunch_end &&
        currentTime >= todayHours.lunch_start &&
        currentTime <= todayHours.lunch_end;

      isOpenNow =
        isInsideWorkingHours &&
        !isLunchTime;
    }

    return {
      isOpenNow,
      todayHours,
    };
  }
}

export { ListBusinessHoursService };