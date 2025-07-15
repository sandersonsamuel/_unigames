import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { updatePurchaseDal } from "@/dal/purchase";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const userEmail = metadata.user_email; // Os metadados do Mercado Pago são convertidos para snake_case

  const competitors = paymentData.metadata.competitors;
  const mpPaymentId = paymentData.id!.toString();
  const paidAt = new Date(paymentData.date_approved!);
  const paymentMethod =
    paymentData.payment_method?.type === "credit_card" ? "CARD" : "PIX";

  await updatePurchaseDal(paymentData.external_reference!, {
    competitors,
    status: "PAID",
    mpPaymentId,
    paidAt,
    paymentMethod,
  });

  return;
}
