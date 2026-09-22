import { headers } from "next/headers";
import {
  defaultPublicLocale,
  isPublicLocale,
  type PublicLocale,
} from "@/lib/i18n/config";

export async function getRequestLocale(): Promise<PublicLocale> {
  const headerStore = await headers();
  const value = headerStore.get("x-public-locale");

  return isPublicLocale(value) ? value : defaultPublicLocale;
}
