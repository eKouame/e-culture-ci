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
import { etatTotp } from "@/lib/totp-admin";
import { verifierCode } from "@/lib/totp";

// Empreinte d'un mot de passe quelconque : sert à passer le même temps de calcul quand
// l'e-mail est inconnu, pour ne pas révéler quels comptes existent.
const EMPREINTE_FICTIVE = bcrypt.hashSync("empreinte-fictive", 10);

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const { email, password, code } = parsed.data;
  const ip = adresseIp(request);

  // Trop d'échecs récents : on refuse sans même tester le mot de passe, et sans ajouter
  // d'échec (sinon le blocage ne finirait jamais).
  if (await connexionBloquee(email, ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  // Sélection explicite : valable avant comme après la migration des colonnes TOTP.
  const admin = await prisma.adminUser.findUnique({
    where: { email },
    select: { id: true, passwordHash: true },
  });
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

  // Double vérification, seulement pour un compte qui l'a activée. Un code absent n'est
  // pas un échec (c'est la deuxième étape) ; un code faux en est un, donc il compte dans
  // la limitation de tentatives.
  const totp = await etatTotp(admin.id);
  if (totp.migree && totp.active && totp.secret) {
    if (!code) {
      return NextResponse.json(
        { error: "Code de vérification requis.", codeRequis: true },
        { status: 401 },
      );
    }
    if (!verifierCode(totp.secret, code)) {
      await enregistrerEchec(email, ip);
      return NextResponse.json(
        { error: "Code incorrect.", codeRequis: true },
        { status: 401 },
      );
    }
  }

  await effacerEchecs(email);
  await createAdminSession(admin.id);

  return NextResponse.json({ ok: true });
}
