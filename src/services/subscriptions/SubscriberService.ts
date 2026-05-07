import Stripe from "stripe";
import prismaClient from "../../prisma";

interface SubscribeRequest {
  user_id: string;
}

class SubscriberService {
  async execute({ user_id }: SubscribeRequest) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!findUser) {
      throw new Error("Usuário não encontrado");
    }

    let customerId = findUser.stripe_customer_id;

    // 🔥 CRIAR CUSTOMER NO STRIPE SE NÃO EXISTIR
    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: findUser.email,
      });

      await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      });

      customerId = stripeCustomer.id;
    }

    // 🔥 IDENTIFICAR TIPO DE USUÁRIO
    const tipo = findUser.client?.toLowerCase();

    const isCliente = tipo === "cliente";

    // 🔥 DEFINIR URL DINÂMICA
    const success_url = isCliente
      ? process.env.STRIPE_SUCCESS_CLIENT_URL
      : process.env.STRIPE_SUCCESS_BARBER_URL;

    const cancel_url = isCliente
      ? process.env.STRIPE_CANCEL_CLIENT_URL
      : process.env.STRIPE_CANCEL_BARBER_URL;

    // 🔥 CRIAR SESSÃO DE PAGAMENTO
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",

      line_items: [
        {
          price: `${process.env.STRIPE_PRICE}`,
          quantity: 1,
        },
      ],

      mode: "subscription",
      allow_promotion_codes: true,

      success_url: success_url,
      cancel_url: cancel_url,
    });

    console.log("Checkout URL:", stripeCheckoutSession.url);

    return { url: stripeCheckoutSession.url };
  }
}

export { SubscriberService };