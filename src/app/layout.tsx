import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Eryon | Transforming Ideas into Digital Reality",
    template: "%s | Eryon",
  },
  description:
    "Eryon is a leading digital agency specializing in web development, mobile apps, and digital transformation. We build innovative solutions that drive growth.",
  keywords: [
    "digital agency",
    "web development",
    "mobile apps",
    "digital transformation",
    "software development",
    "UX design",
  ],
  authors: [{ name: "Eryon" }],
  creator: "Eryon",
  publisher: "Eryon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://eryon.studio"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eryon.studio",
    siteName: "Eryon",
    title: "Eryon | Transforming Ideas into Digital Reality",
    description:
      "Eryon is a leading digital agency specializing in web development, mobile apps, and digital transformation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eryon - Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eryon | Transforming Ideas into Digital Reality",
    description:
      "Eryon is a leading digital agency specializing in web development, mobile apps, and digital transformation.",
    images: ["/og-image.png"],
    creator: "@eryonmx",
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
      className={`${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
