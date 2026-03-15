import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { prefetchDocumentCategories } from "@/lib/prefetch-document-categories";
import { QueryProvider } from "@/providers/QueryProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

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

export const metadata: Metadata = {
  title: "brn",
  description: "Document and category management with chat",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default RootLayout;
