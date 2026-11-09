import { createHmac, randomInt } from "node:crypto";

export function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase().slice(0, 254) : "";
}

export function validEmail(value) {
  return value.length >= 5 && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function makeVerificationCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function verificationHash(email, code) {
  const secret = process.env.EMAIL_VERIFICATION_SECRET;
  if (!secret || secret.length < 32) throw new Error("EMAIL_VERIFICATION_SECRET must contain at least 32 characters.");
  return createHmac("sha256", secret).update(`${email}:${code}`).digest("hex");
}

export function hashRequestIp(ip) {
  const secret = process.env.EMAIL_VERIFICATION_SECRET;
  if (!secret || secret.length < 32) throw new Error("EMAIL_VERIFICATION_SECRET must contain at least 32 characters.");
  return createHmac("sha256", secret).update(`ip:${ip || "unknown"}`).digest("hex");
}

export function requestIp(request) {
  // Prefer headers set by the edge proxy; never persist the raw address.
  return request.headers.get("cf-connecting-ip")?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim()
    || "unknown";
}
