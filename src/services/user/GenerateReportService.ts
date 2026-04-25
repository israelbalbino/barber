import prismaClient from "../../prisma";
import PDFDocument from "pdfkit";
import path from "path";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

interface ReportRequest {
  user_id: string;
  datainicial?: string;
  datafinal?: string;
}


class GenerateReportService {
  async execute({ user_id, datainicial, datafinal }: ReportRequest): Promise<Buffer> {

    const start = datainicial ? new Date(datainicial) : new Date();
    start.setUTCHours(0, 0, 0, 0);

    const end = datafinal ? new Date(datafinal) : new Date();
    end.setUTCHours(23, 59, 59, 999);

    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
      select: { name: true },
    });

    const services = await prismaClient.service.findMany({
      where: {
        user_id,
        status: false,
        created_at: {
          gte: start,
          lte: end,
        },
      },
      select: {
        customer: true,
        created_at: true,
        haircut: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });

    // ================= MÉTRICAS =================
    const total = services.reduce((acc, i) => acc + i.haircut.price, 0);
    const quantidade = services.length;
    const media = quantidade ? total / quantidade : 0;

    const formatMoney = (v: number) =>
      v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    // ================= RANKING =================
    const rankingMap: Record<string, { count: number; total: number }> = {};

    services.forEach((item) => {
      const name = item.haircut.name;

      if (!rankingMap[name]) {
        rankingMap[name] = { count: 0, total: 0 };
      }

      rankingMap[name].count += 1;
      rankingMap[name].total += item.haircut.price;
    });

    const ranking = Object.entries(rankingMap)
      .map(([name, data]) => ({
        name,
        count: data.count,
        total: data.total,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);


    const doc = new PDFDocument({ margin: 50 });
    const buffers: Uint8Array[] = [];

    doc.on("data", buffers.push.bind(buffers));
    const endPromise = new Promise<Buffer>((resolve) =>
      doc.on("end", () => resolve(Buffer.concat(buffers)))
    );

    const logoPath = path.resolve(__dirname, "..", "..", "assets", "logo.png");

    // ================= HEADER =================
  

    doc.fillColor("#111").fontSize(18).text("ARABARBER", 100, 45);
    doc.fillColor("#666").fontSize(10)
      .text(`Gerado em ${new Date().toLocaleDateString()}`, 100, 65);

    doc.moveDown(3);

    // ================= TÍTULO =================
    doc.fillColor("#111").fontSize(20)
      .text("Relatório de Faturamento");

    doc.fillColor("#777").fontSize(11)
      .text(`${start.toLocaleDateString()} até ${end.toLocaleDateString()}`);

    doc.moveDown(2);

    // ================= CARDS =================
    const y = doc.y;

    const card = (x: number, title: string, value: string) => {
      doc.roundedRect(x, y, 150, 70, 10)
        .fillAndStroke("#FFFFFF", "#EAEAEA");

      doc.fillColor("#999").fontSize(10)
        .text(title, x + 12, y + 15);

      doc.fillColor("#111").fontSize(18)
        .text(value, x + 12, y + 35);
    };

    card(50, "Faturamento", formatMoney(total));
    card(220, "Serviços", String(quantidade));
    card(390, "Ticket Médio", formatMoney(media));

    doc.moveDown(5);

    
    // ================= RANKING =================
    // ================= RANKING =================
if (ranking.length > 0) {

  doc.fillColor("#111").fontSize(14)
    .text("Serviços mais realizados");

  doc.moveDown(1);

  ranking.forEach((item, index) => {

    const startX = 50;
    const y = doc.y;

    // container (tipo linha)
    doc
      .roundedRect(startX, y - 4, 500, 24, 6)
      .fillAndStroke("#FAFAFA", "#EAEAEA");

    // posição
    doc
      .fillColor("#999")
      .fontSize(10)
      .text(`${index + 1}.`, startX + 10, y + 4);

    // nome (flex-start principal)
    doc
      .fillColor("#111")
      .fontSize(11)
      .text(item.name, startX + 30, y + 4, {
        width: 220,
        ellipsis: true,
      });

    // quantidade
    doc
      .fillColor("#666")
      .fontSize(10)
      .text(`${item.count}x`, startX + 270, y + 4);

    // valor (direita)
    doc
      .fillColor("#111")
      .fontSize(10)
      .text(
        formatMoney(item.total),
        startX + 320,
        y + 4,
        {
          width: 120,
          align: "right",
        }
      );

    doc.moveDown(1.5);
  });

  doc.moveDown(2);
}
    // ================= TABELA =================
    let tableY = doc.y;

    const col = {
      cliente: 50,
      servico: 220,
      data: 380,
      valor: 500,
    };

    const header = () => {
      doc.fontSize(9).fillColor("#888").font("Helvetica-Bold");

      doc.text("CLIENTE", col.cliente, tableY);
      doc.text("SERVIÇO", col.servico, tableY);
      doc.text("DATA", col.data, tableY);
      doc.text("VALOR", col.valor, tableY, {
        align: "right",
        width: 50,
      });

      tableY += 15;

      doc.moveTo(50, tableY).lineTo(550, tableY).stroke("#EAEAEA");

      tableY += 8;
    };

    header();

    doc.font("Helvetica").fontSize(10);

    services.forEach((item, index) => {

      if (tableY > 730) {
        doc.addPage();
        tableY = 50;
        header();
      }

      if (index % 2 === 0) {
        doc.rect(50, tableY - 3, 500, 20).fill("#FAFAFA");
      }

      doc.fillColor("#111");

      doc.text(item.customer, col.cliente, tableY, {
        width: 150,
        ellipsis: true,
      });

      doc.text(item.haircut.name, col.servico, tableY, {
        width: 140,
        ellipsis: true,
      });

      doc.text(
        new Date(item.created_at).toLocaleDateString(),
        col.data,
        tableY
      );

      doc.text(
        formatMoney(item.haircut.price),
        col.valor,
        tableY,
        {
          width: 50,
          align: "right",
        }
      );

      tableY += 20;
    });

    


    // ================= RODAPÉ =================
    doc.moveTo(50, 780).lineTo(550, 780).stroke("#EAEAEA");

    doc.fillColor("#999").fontSize(9)
      .text("ARABARBER • Relatório Completo", 50, 790, {
        align: "center",
      });

    doc.end();

    return await endPromise;
  }
}

export { GenerateReportService };