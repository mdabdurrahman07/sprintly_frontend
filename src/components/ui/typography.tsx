import * as React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
}

export function Heading({ as: Component = "h2", className = "", children, ...props }: HeadingProps) {
  const styles = {
    h1: "text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.14]",
    h2: "text-3xl md:text-4xl font-extrabold text-foreground tracking-tight",
    h3: "text-xl md:text-2xl font-bold text-foreground tracking-tight",
    h4: "text-base md:text-lg font-bold text-foreground",
  };

  return (
    <Component className={`${styles[Component]} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function Text({
  className = "",
  size = "md",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-xs md:text-sm text-muted-foreground leading-relaxed",
    md: "text-sm md:text-base text-muted-foreground leading-relaxed",
    lg: "text-lg md:text-xl text-muted-foreground leading-relaxed",
  };

  return (
    <p className={`${sizes[size]} ${className}`} {...props}>
      {children}
    </p>
  );
}

export function SectionHeader({
  badge,
  title,
  description,
  className = "",
}: {
  badge: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-16 ${className}`}>
      <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary-subtle text-primary-subtle-foreground px-3 py-1 rounded-full border border-primary-border">
        {badge}
      </span>
      <Heading as="h2" className="mt-3 mb-3">
        {title}
      </Heading>
      <Text size="md">{description}</Text>
    </div>
  );
}