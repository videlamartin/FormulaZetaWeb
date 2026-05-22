"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-gradient-to-b from-black/80 to-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
            <Image src="/images/logo.png" alt="FormulaZeta Logo" fill className="object-contain drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]" />
          </div>
          <span className="text-xl font-display font-bold tracking-widest text-white group-hover:text-primary transition-colors">
            FormulaZeta
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {[
            { name: "Inicio", id: "inicio" },
            { name: "Sobre Mí", id: "sobre-mi" },
            { name: "Videos", id: "videos" },
            { name: "Calendario", id: "calendario" },
            { name: "Noticias", id: "noticias" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={`#${item.id}`}
                className="text-gray-300 hover:text-primary transition-colors duration-300 relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden md:block">
          <Link
            href="#videos"
            className="flex items-center gap-1 bg-white/10 hover:bg-primary text-white px-5 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:border-primary transition-all text-sm font-bold"
          >
            Último Video <ChevronRight size={16} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 space-y-4 text-center text-lg font-medium">
          {[
            { name: "Inicio", id: "inicio" },
            { name: "Sobre Mí", id: "sobre-mi" },
            { name: "Videos", id: "videos" },
            { name: "Calendario", id: "calendario" },
            { name: "Noticias", id: "noticias" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-primary transition-colors py-2"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
