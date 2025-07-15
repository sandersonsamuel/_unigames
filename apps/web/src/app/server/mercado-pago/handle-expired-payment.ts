import "server-only";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { updatePurchaseDal } from "@/dal/purchase";

export const handleMercadoPagoExpired = async (paymentData: PaymentResponse) => {
  const metadata = paymentData.metadata;

};