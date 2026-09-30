import Logo from "@/components/shared/Logo";
import SectionBadge from "@/components/shared/SectionBadge";

import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-white text-zinc-900 min-h-screen antialiased flex flex-col justify-center font-sans">
      <main className="w-full min-h-screen flex flex-col lg:flex-row p-3 lg:p-4 gap-4">
        {/* BEGIN: LeftFeaturePanel */}
        <section className="lg:w-[46%] xl:w-[44%] bg-[#EDF3FC] rounded-4xl p-8 sm:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-8 max-w-xl">
            {/* Logo Header */}
           <Logo/>

            <SectionBadge icon={true} content="AGILE WORKSPACES" />

            <h1 className="text-4xl sm:text-[42px] font-bold tracking-tight text-zinc-900 leading-[1.18]">
              Get your team organized in minutes
            </h1>

            <p className="text-base text-zinc-600 leading-relaxed max-w-lg">
              Sprintly replaces ad-hoc spreadsheets and chaotic chat threads
              with one shared system for high-velocity projects, tasks, and
              deliverables.
            </p>

            {/* Key Feature List */}
            <ul aria-label="Key Features" className="space-y-4 pt-2">
              <li className="flex items-center gap-3.5 text-zinc-800 font-medium text-sm">
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </span>
                <span>Assign tasks by role with granular control</span>
              </li>
              <li className="flex items-center gap-3.5 text-zinc-800 font-medium text-sm">
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </span>
                <span>Track progress and sprints in real time</span>
              </li>
              <li className="flex items-center gap-3.5 text-zinc-800 font-medium text-sm">
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </span>
                <span>Simple bKash localized billing & zero lock-in</span>
              </li>
            </ul>
          </div>

          {/* Interactive Mock Kanban Preview Widget */}
          <div className="mt-10 max-w-md w-full bg-white rounded-2xl p-4 shadow-[0_12px_36px_-4px_rgba(26,46,85,0.07),0_4px_12px_-2px_rgba(26,46,85,0.04)] border border-white/60 select-none">
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></span>
                </div>
                <span className="ml-2 text-xs font-semibold text-zinc-800">
                  Sprint 24 • Core Roadmap
                </span>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium text-emerald-600 bg-emerald-50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Sync
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                    In Progress
                  </span>
                  <span className="w-4 h-4 rounded-full bg-zinc-200/80 text-[10px] font-semibold text-zinc-700 flex items-center justify-center">
                    2
                  </span>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm border border-zinc-100 space-y-2">
                  <p className="text-[11px] font-medium text-zinc-900 leading-snug">
                    Design onboarding checklist
                  </p>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                      Med
                    </span>
                    <span className="text-zinc-400">Today</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                    Done
                  </span>
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-700 flex items-center justify-center">
                    4
                  </span>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm border border-zinc-100 space-y-2">
                  <p className="text-[11px] font-medium text-zinc-900 leading-snug">
                    Export CSV billing summaries
                  </p>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
                      Done
                    </span>
                    <svg
                      className="w-3.5 h-3.5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
