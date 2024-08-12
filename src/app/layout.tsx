import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/Providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/Providers/ReduxProvider";
import FetchApitProvider from "@/Providers/FetchApitProvider";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Nova - eCommerce dashboard",
  description: "Nova - eCommerce dashboard",
  icons:{
    icon:"/images/logo.png"
  }
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <script src="http://localhost:3000"></script>
      </head>
      <body className={roboto.className + " dark:bg-slate-900"}>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <FetchApitProvider>
              <ThemeProvider attribute="class" defaultTheme="system">
                {children}
              </ThemeProvider>
            </FetchApitProvider>
          </ReduxProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
