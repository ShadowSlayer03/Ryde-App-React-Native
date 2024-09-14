import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount } = body;
  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({ error: "Please enter valid details!", status: 400 })
    );
  }

  let customer;
  const existingCustomer = await stripe.customers.list({ email });

  if (existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0];
  } else {
    const newCustomer = await stripe.customers.create({ name, email });
    customer = newCustomer;
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-06-20" }
  );

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(amount) * 100,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });
    return new Response(
      JSON.stringify({
        paymentIntent: paymentIntent,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_API_KEY,
      })
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err, status: 500 }));
  }
}
