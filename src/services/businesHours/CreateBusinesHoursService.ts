import prismaClient from "../../prisma";

interface HoursItem {
  day: number;
  open_time: string;
  lunch_start?: string;
  lunch_end?: string;
  close_time: string;
  is_open: boolean;
}

interface BusinessHoursRequest {
  user_id: string;
  data: HoursItem[];
}

class CreateBusinessHoursService {
    async execute({
        user_id,
        data,
      }: BusinessHoursRequest) {
      
        const result = [];
      
        for (const item of data) {
      
          const businessHours =
            await prismaClient.businessHours.upsert({
              where: {
                user_id_day: {
                  user_id,
                  day: item.day,
                },
              },
              update: {
                open_time: item.open_time,
                lunch_start: item.lunch_start,
                lunch_end: item.lunch_end,
                close_time: item.close_time,
                is_open: item.is_open,
              },
              create: {
                user_id,
                day: item.day,
                open_time: item.open_time,
                lunch_start: item.lunch_start,
                lunch_end: item.lunch_end,
                close_time: item.close_time,
                is_open: item.is_open,
              },
            });
      
          result.push(businessHours);
        }
      
        return result;
      }
}

export { CreateBusinessHoursService };