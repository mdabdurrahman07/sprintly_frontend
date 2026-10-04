import React from "react";

const ProjectGraph = () => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-headline text-lg font-bold text-zinc-900 dark:text-foreground">
            New projects this quarter
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
            Apr – Sep 2025 velocity
          </p>
        </div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-primary/10 dark:text-primary">
          +50%
          <br />
          QoQ
        </span>
      </div>

      <div className="relative mt-8 h-[140px] w-full">
        {/* Static SVG Chart mimicking the design */}
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="currentColor"
                stopOpacity="0.2"
                className="text-blue-500"
              />
              <stop
                offset="100%"
                stopColor="currentColor"
                stopOpacity="0"
                className="text-blue-500"
              />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1="0"
            y1="50"
            x2="300"
            y2="50"
            stroke="currentColor"
            strokeDasharray="3 3"
            strokeWidth="1"
            className="text-zinc-200 dark:text-border"
          />
          <line
            x1="0"
            y1="100"
            x2="300"
            y2="100"
            stroke="currentColor"
            strokeDasharray="3 3"
            strokeWidth="1"
            className="text-zinc-200 dark:text-border"
          />

          {/* Area Fill */}
          <path
            d="M0,80 C30,75 40,70 70,70 C100,70 120,50 150,50 C180,50 210,35 240,25 C270,15 285,5 300,0 L300,100 L0,100 Z"
            fill="url(#blueGradient)"
          />

          {/* Line */}
          <path
            d="M0,80 C30,75 40,70 70,70 C100,70 120,50 150,50 C180,50 210,35 240,25 C270,15 285,5 300,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-blue-600 dark:text-primary"
          />

          {/* Data Points */}
          <circle
            cx="0"
            cy="80"
            r="3.5"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600 dark:text-primary"
          />
          <circle
            cx="70"
            cy="70"
            r="3.5"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600 dark:text-primary"
          />
          <circle
            cx="150"
            cy="50"
            r="3.5"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600 dark:text-primary"
          />
          <circle
            cx="240"
            cy="25"
            r="3.5"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600 dark:text-primary"
          />
          <circle
            cx="300"
            cy="0"
            r="3.5"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600 dark:text-primary"
          />
        </svg>

        {/* X-Axis Labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[11px] font-medium text-zinc-400">
          <span>Apr</span>
          <span>May</span>
          <span className="ml-2">Jun</span>
          <span className="ml-4">Jul</span>
          <span className="ml-5">Aug</span>
          <span className="font-bold text-blue-600 dark:text-primary">Sep</span>
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-border/50 dark:text-muted-foreground">
        Current Velocity{" "}
        <span className="font-semibold text-zinc-900 dark:text-foreground">
          6 new projects started in Sep
        </span>
      </div>
    </div>
  );
};

export default ProjectGraph;
