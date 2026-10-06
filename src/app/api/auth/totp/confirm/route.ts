import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { etatTotp } from "@/lib/totp-admin";
import { verifierCode } from "@/lib/totp";

const schema = z.object({ code: z.string().trim().min(1) });

// Active la double vérification, si le code saisi correspond au secret préparé.
export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Code requis" }, { status: 400 });

  const etat = await etatTotp(admin.id);
  if (!etat.migree || !etat.secret) {
    return NextResponse.json({ error: "Aucune activation en cours." }, { status: 409 });
  }
  if (!verifierCode(etat.secret, parsed.data.code)) {
    return NextResponse.json({ error: "Code incorrect." }, { status: 400 });
  }

  await prisma.adminUser.update({ where: { id: admin.id }, data: { totpEnabled: true } });
  return NextResponse.json({ ok: true });
}
