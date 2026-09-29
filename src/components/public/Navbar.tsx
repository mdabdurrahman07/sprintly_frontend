"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../shared/Logo";

const navItems = [
  { link: "/", name: "Home" },
  { link: "/features", name: "Features" },
  { link: "/how_it_works", name: "How it works" },
  { link: "/pricing", name: "Pricing" },
  { link: "/faq", name: "FAQ" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-6 z-50 px-4">
      <nav className="max-w-6xl mx-auto bg-card/95 backdrop-blur-md rounded-full px-6 py-3.5 flex items-center justify-between border border-border shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 transition-colors"
          >
            Log in
          </Link>
          <Button size="md">
            <Link href="#pricing" className="flex items-center gap-1.5">
              <span>Get started</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </Button>
        </div>

        {/* Mobile "Three Dots" Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </nav>

      {/* --- Mobile Drawer Overlay --- */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- Mobile Drawer Panel --- */}
      <div
        className={`fixed top-0 right-0 h-full w-[260px] bg-background border-l border-border z-[70] transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header & Close Button */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation Items */}
        <div className="flex flex-col gap-5 px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px bg-border my-2 w-full" />

          {/* Mobile Auth Buttons */}
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Login
          </Link>

          <Button size="md" className="w-full mt-2">
            <Link
              href="/registration"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5"
            >
              <span>Get started</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
