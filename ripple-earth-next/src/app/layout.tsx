import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/SEO/JsonLd";
import { Cursor } from "@/components/UI";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["100", "200", "300", "400", "500"],
});

const siteName = "Ripple Earth";
const siteDescription =
  "A digital Earth storytelling experience. Every impact begins with something small.";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${siteName} | Digital Earth Storytelling Experience`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Earth science",
    "climate",
    "environment",
    "digital Earth",
    "interactive storytelling",
    "ocean",
    "atmosphere",
    "biosphere",
    "data visualization",
    "planetary science",
    "environmental data",
    "interactive globe",
  ],
  authors: [{ name: "Ripple Earth" }],
  creator: "Ripple Earth",
  publisher: "Ripple Earth",
  metadataBase: new URL("https://rippleearth.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteName,
    title: `${siteName} | Digital Earth Storytelling Experience`,
    description: siteDescription,
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ripple Earth \u2014 Digital Earth Storytelling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Digital Earth Storytelling Experience`,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, inter.variable, jetbrainsMono.variable)}>
      <body>
        <JsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
        <Cursor />
      </body>
    </html>
  );
}
