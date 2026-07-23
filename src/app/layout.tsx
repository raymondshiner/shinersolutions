import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shinersolutions.com"),
  title: "Shiner Solutions — Your website, handled",
  description:
    "Modern, professional websites for local businesses in Spokane Valley — built and looked after by a real person. No templates, no lock-in, and you own everything.",
  openGraph: {
    title: "Shiner Solutions — Your website, handled",
    description:
      "Modern, professional websites for local businesses — built and looked after by a real person. And you own everything.",
    url: "https://shinersolutions.com",
    siteName: "Shiner Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiner Solutions — Your website, handled",
    description:
      "Modern, professional websites for local businesses — built and looked after by a real person. And you own everything.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
