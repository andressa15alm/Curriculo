"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // fecha no ESC e bloqueia scroll do body quando o menu está aberto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // fecha ao clicar em um link de âncora
  const handleNavClick = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#home" className="font-semibold tracking-wide">Andressa Almeida</a>

        {/* Desktop nav */}
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#home" className="opacity-90 hover:opacity-100">Home</a>
          <a href="#about" className="opacity-90 hover:opacity-100">About Me</a>
          <a href="#projects" className="opacity-90 hover:opacity-100">Projects</a>
          <a href="#contact" className="opacity-90 hover:opacity-100">Contact</a>
        </nav>

        {/* Mobile button */}
        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 hover:bg-white/15"
        >
          {/* ícone hambúrguer / X */}
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-5 bg-white transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu overlay + sheet */}
      <div
        aria-hidden={!open}
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* drawer/top sheet */}
        <nav
          className={`fixed inset-x-0 top-0 z-50 origin-top rounded-b-2xl border-b border-white/10 bg-[rgba(8,12,18,0.8)] backdrop-blur-xl transition-all
            ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto max-w-6xl px-5 pb-6 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 hover:bg-white/15"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
              >
                <span className="relative block h-3.5 w-5">
                  <span className="absolute left-0 top-0 h-0.5 w-5 rotate-45 bg-white" />
                  <span className="absolute left-0 top-0 h-0.5 w-5 -rotate-45 bg-white" />
                </span>
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#home"
                  onClick={handleNavClick}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base hover:bg-white/10"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={handleNavClick}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base hover:bg-white/10"
                >
                  Sobre mim
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={handleNavClick}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base hover:bg-white/10"
                >
                  Projetos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base hover:bg-white/10"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
