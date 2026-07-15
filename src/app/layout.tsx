import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "Apex Digital | Transforming Ideas into Digital Reality",
    template: "%s | Apex Digital",
  },
  description:
    "Apex Digital is a leading digital agency specializing in web development, mobile apps, and digital transformation. We build innovative solutions that drive growth.",
  keywords: [
    "digital agency",
    "web development",
    "mobile apps",
    "digital transformation",
    "software development",
    "UX design",
  ],
  authors: [{ name: "Apex Digital" }],
  creator: "Apex Digital",
  publisher: "Apex Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://apex-digital.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apex-digital.com",
    siteName: "Apex Digital",
    title: "Apex Digital | Transforming Ideas into Digital Reality",
    description:
      "Apex Digital is a leading digital agency specializing in web development, mobile apps, and digital transformation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Apex Digital - Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Digital | Transforming Ideas into Digital Reality",
    description:
      "Apex Digital is a leading digital agency specializing in web development, mobile apps, and digital transformation.",
    images: ["/og-image.png"],
    creator: "@apexdigital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}