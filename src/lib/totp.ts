import { createHmac, randomBytes, timingSafeEqual } from "crypto";

// Codes à usage unique à durée limitée (TOTP, RFC 6238), compatibles avec les
// applications d'authentification courantes (Google Authenticator, Authy, 2FAS…).
// Aucune dépendance : HMAC-SHA1, pas de 30 s, 6 chiffres.

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export const PAS_SECONDES = 30;
export const CHIFFRES = 6;

export function genererSecret(): string {
  return base32Encode(randomBytes(20));
}

export function base32Encode(buf: Buffer): string {
  let bits = 0;
  let valeur = 0;
  let sortie = "";
  for (const octet of buf) {
    valeur = (valeur << 8) | octet;
    bits += 8;
    while (bits >= 5) {
      sortie += ALPHABET[(valeur >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) sortie += ALPHABET[(valeur << (5 - bits)) & 31];
  return sortie;
}

export function base32Decode(texte: string): Buffer {
  const propre = texte.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let valeur = 0;
  const octets: number[] = [];
  for (const c of propre) {
    valeur = (valeur << 5) | ALPHABET.indexOf(c);
    bits += 5;
    if (bits >= 8) {
      octets.push((valeur >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(octets);
}

// Code attendu à l'instant `tempsMs` (millisecondes).
export function codeA(secretBase32: string, tempsMs: number, chiffres = CHIFFRES): string {
  const compteur = Math.floor(tempsMs / 1000 / PAS_SECONDES);
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(compteur));
  const hmac = createHmac("sha1", base32Decode(secretBase32)).update(message).digest();
  const decalage = hmac[hmac.length - 1] & 0x0f;
  const binaire =
    ((hmac[decalage] & 0x7f) << 24) |
    (hmac[decalage + 1] << 16) |
    (hmac[decalage + 2] << 8) |
    hmac[decalage + 3];
  return String(binaire % 10 ** chiffres).padStart(chiffres, "0");
}

// Accepte le pas précédent et le suivant, pour absorber un petit écart d'horloge.
export function verifierCode(secretBase32: string, saisi: string, tempsMs = Date.now()): boolean {
  const code = saisi.replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return false;
  let ok = false;
  for (const delta of [-1, 0, 1]) {
    const attendu = codeA(secretBase32, tempsMs + delta * PAS_SECONDES * 1000);
    if (timingSafeEqual(Buffer.from(attendu), Buffer.from(code))) ok = true;
  }
  return ok;
}

export function uriOtpauth(secretBase32: string, compte: string, emetteur = "e-Culture CI"): string {
  const etiquette = encodeURIComponent(`${emetteur}:${compte}`);
  return `otpauth://totp/${etiquette}?secret=${secretBase32}&issuer=${encodeURIComponent(emetteur)}&algorithm=SHA1&digits=${CHIFFRES}&period=${PAS_SECONDES}`;
}
