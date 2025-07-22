import { db } from '../db/connection';
import { schema } from '../db/schemas';
import { eq } from 'drizzle-orm';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { env } from '../env';
import { competitorsType } from '../schemas/competitors.schema';

const client = new MercadoPagoConfig({ accessToken: env.MP_ACCESS_TOKEN });

export async function handleMercadoPagoWebhook(type: string, data: { id: string }) {

  console.log(
    `Received Mercado Pago webhook: type=${type}, data.id=${data.id}`
  )

  if (type !== 'payment') return { received: true };

  const payment = new Payment(client);
  const paymentData = await payment.get({ id: data.id });

  if (!paymentData) return { error: 'Payment data not found' };

  const purchases = await db.select({ id: schema.purchases.id }).from(schema.purchases).where(eq(schema.purchases.id, paymentData.external_reference!));
  const purchase = purchases[0];

  if (!purchase) return { error: 'Purchase not found' };

  if (paymentData.status === 'approved' && paymentData.date_approved) {

    console.log(`Payment approved: ${paymentData.id}, purchaseId: ${purchase.id}`);

    const paymentMethod = paymentData.payment_type_id === 'credit_card' ? 'CARD' : 'PIX';
    const competitors = paymentData.metadata.competitors as competitorsType;
    await db.update(schema.purchases).set({
      paymentStatus: 'PAID',
      paymentMethod,
      paidAt: new Date(paymentData.date_approved)
    }).where(eq(schema.purchases.id, purchase.id));

    if (competitors.length > 0) {
      await db.insert(schema.competitors).values(competitors.map((competitor) => ({ ...competitor, purchaseId: purchase.id })));
    }
  }

  if (paymentData.status === 'expired' || paymentData.status === 'cancelled') {
    console.log(`Payment expired or cancelled ${paymentData.status}: ${paymentData.id}, purchaseId: ${purchase.id}`);
    await db.update(schema.purchases).set({ paymentStatus: 'CANCELLED', deletedAt: new Date() }).where(eq(schema.purchases.id, purchase.id));
  }

  return { received: true };
}
