import type { FastifyRequest } from "fastify";
import crypto from "node:crypto";
import { env } from "../../env.ts";

export function verifyMercadoPagoSignature(request: FastifyRequest): boolean {
  const signature = request.headers["x-signature"] as string;
  const requestId = request.headers["x-request-id"] as string;

  if (!signature || !requestId) {
    throw new Error("Missing signature headers");
  }

  const [ts, hash] = signature.split(",");
  if (!ts || !hash) {
    throw new Error("Invalid signature format");
  }

  const timestamp = ts.replace("ts=", "");
  const receivedHash = hash.replace("v1=", "");

  const template = `id:${(request.body as any).data.id};request-id:${requestId};ts:${timestamp};`;

  const generatedHash = crypto
    .createHmac("sha256", env.MP_WEBHOOK_SECRET)
    .update(template)
    .digest("hex");

  return generatedHash === receivedHash;
}
