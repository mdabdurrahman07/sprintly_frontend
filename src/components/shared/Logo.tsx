import { Zap } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
        <Zap className="text-background" />
      </div>
      <div className="font-heading text-lg font-bold tracking-tight text-foreground">Sprintly</div>
    </div>
  );
};

export default Logo;
