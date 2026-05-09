
import Stripe from "stripe";
import prismaClient from "../../prisma";

interface SubscribeRequest {
  user_id: string;
}

class SubscriberService {
  async execute({ user_id }: SubscribeRequest) {

    const stripe = new Stripe(
      process.env.STRIPE_API_KEY as string
    );

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    let customerId = user.stripe_customer_id;

    // 🔥 VALIDAR CUSTOMER
    if (customerId) {
      try {

        const customer = await stripe.customers.retrieve(customerId);

        // 🔥 customer deletado
        if ((customer as any).deleted) {
          customerId = null;
        }

      } catch (err) {

        console.log("CUSTOMER INVÁLIDO");

        customerId = null;
      }
    }

    // 🔥 CRIAR CUSTOMER NOVO
    if (!customerId) {

      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });

      customerId = stripeCustomer.id;

      // 🔥 salva customer novo
      await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripe_customer_id: customerId,
        },
      });

      console.log("NOVO CUSTOMER:", customerId);
    }

    // 🔥 URLS
    const tipo = user.client?.toLowerCase();

    const isCliente = tipo === "cliente";

    const price_client = isCliente ? process.env.STRIPE_PRICE_CLIENT! : process.env.STRIPE_PRICE_BARBER!


    const success_url = isCliente
      ? process.env.STRIPE_SUCCESS_CLIENT_URL!
      : process.env.STRIPE_SUCCESS_BARBER_URL!;

    const cancel_url = isCliente
      ? process.env.STRIPE_CANCEL_CLIENT_URL!
      : process.env.STRIPE_CANCEL_BARBER_URL!;

    // 🔥 CHECKOUT
    const session = await stripe.checkout.sessions.create({
      customer: customerId,

      payment_method_types: ["card"],

      billing_address_collection: "required",

      mode: "subscription",

      line_items: [
        {
          price: price_client,
          quantity: 1,
        },
      ],

      allow_promotion_codes: true,

      success_url,
      cancel_url,
    });

    return {
      url: session.url,
    };
  }
}

export { SubscriberService };