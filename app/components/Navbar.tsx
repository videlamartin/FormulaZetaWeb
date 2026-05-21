"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-display text-primary">
          FormulaZeta
        </Link>
        <ul className="hidden md:flex space-x-6 text-sm text-lightGray">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-primary transition-colors">
              Nosotros
            </Link>
          </li>
          <li>
            <Link href="/videos" className="hover:text-primary transition-colors">
              Videos
            </Link>
          </li>
          <li>
            <Link href="/calendar" className="hover:text-primary transition-colors">
              Calendario
            </Link>
          </li>
          <li>
            <Link href="/news" className="hover:text-primary transition-colors">
              Noticias
            </Link>
          </li>
        </ul>
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-lightGray hover:text-primary transition-colors"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90">
          <ul className="flex flex-col space-y-2 p-4 text-lightGray text-sm">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block hover:text-primary transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block hover:text-primary transition-colors"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/videos"
                onClick={() => setIsOpen(false)}
                className="block hover:text-primary transition-colors"
              >
                Videos
              </Link>
            </li>
            <li>
              <Link
                href="/calendar"
                onClick={() => setIsOpen(false)}
                className="block hover:text-primary transition-colors"
              >
                Calendario
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                onClick={() => setIsOpen(false)}
                className="block hover:text-primary transition-colors"
              >
                Noticias
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
