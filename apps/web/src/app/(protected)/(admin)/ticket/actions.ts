"use server";

import { setCompetitorTicketRedeemedDal } from "@/dal/competitor";

export const setTicketReedemedAction = async (ticketId: string) => {
  return await setCompetitorTicketRedeemedDal(ticketId);
};
