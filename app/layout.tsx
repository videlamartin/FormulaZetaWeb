import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

// Fonts – premium racing vibe
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "FormulaZeta – Premium F1 Content",
  description: "High‑performance, mobile‑first hub for Formula 1 creator FormulaZeta",
  openGraph: {
    title: "FormulaZeta – Premium F1 Content",
    description: "High‑performance, mobile‑first hub for Formula 1 creator FormulaZeta",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} h-full bg-darkBG text-lightGray`}> // classes defined in Tailwind config later
      <body className="flex flex-col min-h-screen font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
            <a href="/" className="text-2xl font-display text-primary">FormulaZeta</a>
            <ul className="hidden md:flex space-x-6 text-sm text-lightGray">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="/videos" className="hover:text-primary transition-colors">Videos</a></li>
              <li><a href="/calendar" className="hover:text-primary transition-colors">Calendar</a></li>
              <li><a href="/news" className="hover:text-primary transition-colors">News</a></li>
            </ul>
            {/* Mobile menu button */}
            <button id="mobile-menu-btn" className="md:hidden text-lightGray hover:text-primary transition-colors" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
          {/* Mobile menu – hidden by default, toggled via simple JS */}
          <div id="mobile-menu" className="hidden md:hidden bg-black/90">
            <ul className="flex flex-col space-y-2 p-4 text-lightGray text-sm">
              <li><a href="/" className="block hover:text-primary transition-colors">Home</a></li>
              <li><a href="/about" className="block hover:text-primary transition-colors">About</a></li>
              <li><a href="/videos" className="block hover:text-primary transition-colors">Videos</a></li>
              <li><a href="/calendar" className="block hover:text-primary transition-colors">Calendar</a></li>
              <li><a href="/news" className="block hover:text-primary transition-colors">News</a></li>
            </ul>
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1">{children}</main>
        {/* Footer */}
        <footer className="bg-black/80 text-lightGray py-6">
          <div className="max-w-7xl mx-auto text-center text-sm">
            © {new Date().getFullYear()} FormulaZeta. All rights reserved.
          </div>
        </footer>
        {/* Simple script for mobile menu toggle */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const btn = document.getElementById('mobile-menu-btn');
              const menu = document.getElementById('mobile-menu');
              btn && btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
