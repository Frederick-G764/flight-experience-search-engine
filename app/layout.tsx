import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Flight Experience Search",
  description: "Compare Business and First Class flights based on actual cabin features - no subjective scores, just facts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
