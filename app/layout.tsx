import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Birthday Memory - A Special Surprise",
  description: "A premium interactive birthday experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
