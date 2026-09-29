import React from "react";

interface Props {
  content: string;
  icon: boolean;
}

const Badge = ({ content, icon }: Props) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-border font-medium bg-primary-subtle text-primary w-fit">
      {icon && (
        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
      )}
      <span>{content}</span>
    </div>
  );
};

export default Badge;
