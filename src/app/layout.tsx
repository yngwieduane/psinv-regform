import type { Metadata } from "next";
import { Poppins,Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap'
})

export const metadata: Metadata = {
  title: "List Your Property with PSI",
  description: "List your property in its best light, lease it out in a whole new way, and collect rent–all online. BE with the brand you trust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <GoogleTagManager gtmId="GTM-KDDP2SR" />
      <body
        className={poppins.className}
      >
        {children}
      </body>
    </html>
  );
}
