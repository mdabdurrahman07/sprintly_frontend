"use client";

import * as React from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpenDefault?: boolean;
}

export function AccordionItem({ question, answer, isOpenDefault = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(isOpenDefault);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-semibold text-foreground text-base focus:outline-none"
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {isOpen && (
        <p className="text-muted-foreground text-sm leading-relaxed pt-3 border-t border-border mt-3">
          {answer}
        </p>
      )}
    </div>
  );
}