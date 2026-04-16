import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brain Tumor Detection AI",
  description: "AI MRI Detection System",
  icons: "/logo.svg"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased dark min-h-screen bg-neutral-950 text-neutral-100 relative dark`}>
        {children}
      </body>
    </html>
  );
}