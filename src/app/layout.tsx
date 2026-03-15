import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { prefetchDocumentCategories } from "@/lib/prefetch-document-categories";
import { QueryProvider } from "@/providers/QueryProvider";

import "./globals.css";

export const dynamic = "force-static";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const includeVercelAnalytics =
  process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true" ||
  (process.env.VERCEL === "1" &&
    process.env.NEXT_PUBLIC_VERCEL_ANALYTICS !== "false");

export const metadata: Metadata = {
  title: "brn",
  description: "Document and category management with chat",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });
  await prefetchDocumentCategories(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <QueryProvider dehydratedState={dehydratedState}>
          {children}
        </QueryProvider>
        {includeVercelAnalytics ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default RootLayout;
