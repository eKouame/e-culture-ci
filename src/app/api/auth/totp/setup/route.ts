import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { etatTotp } from "@/lib/totp-admin";
import { genererSecret, uriOtpauth } from "@/lib/totp";

// Prépare l'activation : crée un secret, sans l'activer. Il ne s'active qu'à la
// confirmation, avec un premier code valide (preuve que l'application est bien réglée).
export async function POST() {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const etat = await etatTotp(admin.id);
  if (!etat.migree) {
    return NextResponse.json(
      { error: "La base de données n'est pas encore à jour (migration à appliquer)." },
      { status: 409 },
    );
  }
  if (etat.active) {
    return NextResponse.json(
      { error: "La double vérification est déjà activée." },
      { status: 409 },
    );
  }

  const secret = genererSecret();
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { totpSecret: secret, totpEnabled: false },
  });
  return NextResponse.json({ secret, uri: uriOtpauth(secret, admin.email) });
}
