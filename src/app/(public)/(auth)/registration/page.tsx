import RegistrationForm from "@/components/Form/Auth/Registration/RegistrationForm";
import Logo from "@/components/shared/Logo";
import SectionBadge from "@/components/shared/SectionBadge";
import { Activity, Check, CreditCard, Users } from "lucide-react";
import Link from "next/link";

const registrationPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-background">
      {/* LEFT PANEL (~45% width, light tinted background, rounded-r-3xl) */}
      <div className="lg:w-[45%] w-full bg-primary-subtle/70 border-r border-primary-border/60 p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden lg:rounded-r-[2.5rem]">
        {/* Background subtle decorative glow/blob */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-subtle rounded-full blur-3xl pointer-events-none opacity-60" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-border/40 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <div className="inline-flex items-center justify-center">
              <Logo />
            </div>
          </Link>
        </div>

        {/* Mid-section: Headline & Value props */}
        <div className="relative z-10 my-10 lg:my-12">
          <div className="space-y-5">
            <SectionBadge icon={true} content="AGILE WORKSPACES" />

            <h1 className="text-4xl sm:text-[42px] font-bold tracking-tight text-zinc-900 leading-[1.18]">
              Get your team organized in minutes
            </h1>

            <p className="text-base text-zinc-600 leading-relaxed max-w-lg">
              Sprintly replaces ad-hoc spreadsheets and chaotic chat threads
              with one shared system for high-velocity projects, tasks, and
              deliverables.
            </p>
          </div>

          {/* Value Props list */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-card shadow-xs border border-primary-border flex items-center justify-center shrink-0 text-primary">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Assign tasks by role with granular control
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-card shadow-xs border border-primary-border flex items-center justify-center shrink-0 text-primary">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Track progress and sprints in real time
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-card shadow-xs border border-primary-border flex items-center justify-center shrink-0 text-primary">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Simple bKash localized billing &amp; zero lock-in
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Kanban Board Widget */}
        <div className="relative z-10 pt-2">
          <div className="bg-card/95 backdrop-blur-xs rounded-2xl p-4 shadow-md border border-primary-border">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-foreground ml-1">
                  Sprint 24 · Core Roadmap
                </span>
              </div>
              <span className="text-[11px] font-medium text-success-foreground bg-success-subtle px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Live Sync
              </span>
            </div>

            {/* Mini columns demo */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-muted/50 rounded-xl p-2.5 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    In Progress
                  </span>
                  <span className="text-[10px] bg-muted text-foreground font-semibold px-1.5 py-0.5 rounded-full">
                    2
                  </span>
                </div>
                <div className="bg-card p-2 rounded-lg border border-border shadow-2xs mb-1.5">
                  <p className="text-[11px] font-medium text-foreground leading-snug">
                    Design onboarding checklist
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/50">
                    <span className="text-[9px] font-semibold text-warning-foreground bg-warning-subtle px-1.5 py-0.5 rounded">
                      Med
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Today
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-2.5 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Done
                  </span>
                  <span className="text-[10px] bg-success-subtle text-success-foreground font-semibold px-1.5 py-0.5 rounded-full">
                    4
                  </span>
                </div>
                <div className="bg-card p-2 rounded-lg border border-border shadow-2xs">
                  <p className="text-[11px] font-medium text-foreground leading-snug">
                    Export CSV billing summaries
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/50">
                    <span className="text-[9px] font-semibold text-success-foreground bg-success-subtle px-1.5 py-0.5 rounded">
                      Done
                    </span>
                    <Check className="w-3 h-3 text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL (~55% width, centered form max-w-440px) */}
      <div className="lg:w-[55%] w-full bg-card flex flex-col justify-center items-center px-6 py-12 lg:py-16">
        <div className="w-full max-w-110">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default registrationPage;
