import { PaymentMethod, PurchaseStatus } from "@prisma/client";
import { GameType } from "./games";
import { PaymentStatus } from "./payment-status";

export type PersonsType = {
  name: string;
  registration?: string;
};

export type PersonsTypeResponse = PersonsType & {
  id: string
}

export type CreatePurchaseType = {
  gameId: string;
  userId: string;
};

export type CreatePurchaseResponseType = {
  id: string;
};

export type PurchaseType = {
  id: string
  userId: string
  gameId: string
  game: GameType
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  mpPaymentId: string
  paidAt: Date
}

export type UpdatePurchaseType = {
  competitors?: PersonsType[];
  paymentMethod?: PaymentMethod;
  status?: PurchaseStatus;
  mpPaymentId?: string;
  paidAt?: Date;
};
