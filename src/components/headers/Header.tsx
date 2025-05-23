"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOrcamentoView = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsCollapsed(customEvent.detail);
    };

    window.addEventListener("orcamentoInView", handleOrcamentoView);

    return () => {
      window.removeEventListener("orcamentoInView", handleOrcamentoView);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 px-4 sm:px-6 md:px-10 transition-all duration-300 bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-sm shadow-md ${
        isCollapsed ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`flex justify-between items-center w-full max-w-[1500px] mx-auto text-xs sm:text-sm text-white mb-2 border-b border-white/30 pb-2 transition-all duration-300 ${
          isCollapsed ? "hidden" : "flex"
        }`}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 sm:h-4 sm:w-4 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>(31) 99633-7254</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>
            R. Vila Rica, 1815A - Jardim Montanhês, Belo Horizonte - MG,
            30750-143
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full max-w-[1500px] mx-auto">
        <div
          className={`ml-0 sm:ml-4 md:ml-12 transition-all duration-300 ${
            isCollapsed ? "scale-75 -ml-2" : ""
          }`}
        >
          <Link href="/">
            <Image
              src="/assets/logotipo.png"
              alt="Logotipo da empresa"
              width={180}
              height={25}
              className="drop-shadow-[0_0_0.5px_rgba(255,255,255,0.7)] filter brightness-110 contrast-110 outline-white w-[160px] sm:w-[180px] md:w-[220px]"
              style={{
                filter: "drop-shadow(0px 0px 1px rgba(255,255,255,0.8))",
              }}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`mr-0 md:mr-12 hidden md:flex gap-4 lg:gap-6 items-center font-bold text-white [&>a]:relative [&>a]:after:absolute [&>a]:after:bg-yellow-400 [&>a]:after:h-0.5 [&>a]:after:w-0 [&>a]:after:left-0 [&>a]:after:bottom-0 [&>a]:after:transition-all [&>a:hover]:after:w-full [&>a]:text-shadow-sm transition-all duration-300 ${
            isCollapsed ? "gap-4" : "gap-6"
          }`}
        >
          <Link href="/" className="hover:text-yellow-300 transition-colors">
            Home
          </Link>
          <Link
            href="/sobre-nos"
            className="hover:text-yellow-300 transition-colors"
          >
            Sobre nós
          </Link>
          <Link
            href="/fale-conosco"
            className="hover:text-yellow-300 transition-colors"
          >
            Fale Conosco
          </Link>
          <Link
            href="/#orcamento"
            className="hover:text-yellow-300 transition-colors"
          >
            Orçamento
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-white focus:outline-none"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 absolute top-full left-0 right-0 py-4 px-6 shadow-lg">
          <nav className="flex flex-col space-y-4 font-medium text-white">
            <Link 
              href="/" 
              className="hover:text-yellow-300 transition-colors py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/sobre-nos" 
              className="hover:text-yellow-300 transition-colors py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre nós
            </Link>
            <Link 
              href="/fale-conosco" 
              className="hover:text-yellow-300 transition-colors py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fale Conosco
            </Link>
            <Link 
              href="/#orcamento" 
              className="hover:text-yellow-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Orçamento
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
