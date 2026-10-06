import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { etatTotp } from "@/lib/totp-admin";
import { verifierCode } from "@/lib/totp";

const schema = z.object({ code: z.string().trim().min(1) });

// Désactive la double vérification : exige un code valide, pour qu'une session volée
// ne puisse pas la retirer.
export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Code requis" }, { status: 400 });

  const etat = await etatTotp(admin.id);
  if (!etat.migree || !etat.active || !etat.secret) {
    return NextResponse.json(
      { error: "La double vérification n'est pas activée." },
      { status: 409 },
    );
  }
  if (!verifierCode(etat.secret, parsed.data.code)) {
    return NextResponse.json({ error: "Code incorrect." }, { status: 400 });
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { totpEnabled: false, totpSecret: null },
  });
  return NextResponse.json({ ok: true });
}
