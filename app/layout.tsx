import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";

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
  title: "FormulaZeta – Contenido Premium de F1",
  description: "Plataforma de alto rendimiento y mobile-first para el creador de Fórmula 1 FormulaZeta",
  openGraph: {
    title: "FormulaZeta – Contenido Premium de F1",
    description: "Plataforma de alto rendimiento y mobile-first para el creador de Fórmula 1 FormulaZeta",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${orbitron.variable} h-full bg-darkBG text-lightGray`}>
      <body className="flex flex-col min-h-screen font-sans">
        <Navbar />
        {/* Main content */}
        <main className="flex-1">{children}</main>
        {/* Footer */}
        <footer className="bg-black/80 text-lightGray py-6">
          <div className="max-w-7xl mx-auto text-center text-sm">
            © {new Date().getFullYear()} FormulaZeta. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
