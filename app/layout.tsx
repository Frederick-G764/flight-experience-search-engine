import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Amadeus Flight Search Explorer',
  description:
    'Search live itineraries from the Amadeus Flight Offers Search API and review carriers, aircraft, and pricing in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100">
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/3 bg-purple-500/20 blur-3xl" />
            <div className="absolute -bottom-40 left-[-10%] h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-3xl" />
          </div>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
