import type { Metadata } from "next";
import "@/app/[locale]/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "FluentTales",
  description:
    "A personal project by Mustapha Talbi to help with language's learning by helping you with comprehension and writing",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className=" overflow-auto">{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
