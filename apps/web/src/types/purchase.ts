import { GameInPurchaseType, GameType } from "./games";
import { PaymentMethod } from "./payment-method";
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
  game: GameInPurchaseType
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  initPoint: string 
  mpPaymentId: string
  paidAt: Date
}

export type UpdatePurchaseType = {
  competitors?: PersonsType[];
  paymentMethod?: PaymentMethod;
  status?: PaymentStatus;
  mpPaymentId?: string;
  paidAt?: Date;
};
