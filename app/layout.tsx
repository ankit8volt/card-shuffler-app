import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Card Shuffler",
  description: "Online card shuffler with session management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

