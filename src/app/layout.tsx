import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css"
import "../theme/globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Generational",
  description: "EV Battry Application",
  viewport: {
    height: "inner-height",
    userScalable: false,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>{<Theme>
        {children}
      </Theme>}
        <script defer src="https://app.kastro.chat/script/widget/225:657b20876e776be3c59170aa61ef9270"></script>
      </body>

    </html>
  );
}
