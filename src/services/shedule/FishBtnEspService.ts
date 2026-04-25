import prismaClient from "../../prisma";

interface FishRequest {
    user_id: string;
}

class FishBtnEspService {
    async execute({ user_id }: FishRequest) {

        if (!user_id) {
            throw new Error("user_id obrigatório");
        }

        try {

            // 1. Buscar o PRIMEIRO service com status true
            const service = await prismaClient.service.findFirst({
                where: {
                    user_id: user_id,
                    status: true,
                },
                orderBy: {
                    created_at: "asc", // garante o primeiro
                },
            });

            if (!service) {
                throw new Error("Nenhum serviço ativo encontrado");
            }

            // 2. Atualizar para false
            await prismaClient.service.update({
                where: {
                    id: service.id,
                },
                data: {
                    status: false,
                },
            });

            return {
                message: "Finalizado com sucesso!",
                service_id: service.id
            };

        } catch (error: any) {
            throw new Error(error.message || "Erro ao finalizar serviço");
        }
    }
}

export { FishBtnEspService };