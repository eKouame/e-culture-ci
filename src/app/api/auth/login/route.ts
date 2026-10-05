import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAdminSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validation/login.schema";
import {
  adresseIp,
  connexionBloquee,
  effacerEchecs,
  enregistrerEchec,
} from "@/lib/limite-connexion";

// Empreinte d'un mot de passe quelconque : sert à passer le même temps de calcul quand
// l'e-mail est inconnu, pour ne pas révéler quels comptes existent.
const EMPREINTE_FICTIVE = bcrypt.hashSync("empreinte-fictive", 10);

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const ip = adresseIp(request);

  // Trop d'échecs récents : on refuse sans même tester le mot de passe, et sans ajouter
  // d'échec (sinon le blocage ne finirait jamais).
  if (await connexionBloquee(email, ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  const valid = await bcrypt.compare(
    password,
    admin?.passwordHash ?? EMPREINTE_FICTIVE,
  );

  if (!admin || !valid) {
    await enregistrerEchec(email, ip);
    return NextResponse.json(
      { error: "Identifiants incorrects" },
      { status: 401 },
    );
  }

  await effacerEchecs(email);
  await createAdminSession(admin.id);

  return NextResponse.json({ ok: true });
}
