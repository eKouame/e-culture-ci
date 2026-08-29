"use server";

import { revalidatePath } from "next/cache";
import { requireAdminOrRedirect } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function revalidateFlashInfo() {
  revalidatePath("/admin/flash-info");
  revalidatePath("/", "layout");
}

export async function creerFlashInfo(formData: FormData) {
  await requireAdminOrRedirect();

  const titre = String(formData.get("titre") ?? "").trim();
  const lienRaw = String(formData.get("lien") ?? "").trim();
  const typeRaw = String(formData.get("type") ?? "INTERNE");
  const type = typeRaw === "EXTERNE" ? "EXTERNE" : "INTERNE";
  if (!titre) return;

  await prisma.flashInfo.create({
    data: { titre, lien: lienRaw || null, type },
  });

  revalidateFlashInfo();
}

export async function activerFlashInfo(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.flashInfo.update({
    where: { id },
    data: { actif: true },
  });

  revalidateFlashInfo();
}

export async function desactiverFlashInfo(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.flashInfo.update({
    where: { id },
    data: { actif: false },
  });

  revalidateFlashInfo();
}

export async function supprimerFlashInfo(formData: FormData) {
  await requireAdminOrRedirect();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.flashInfo.delete({ where: { id } });

  revalidateFlashInfo();
}
