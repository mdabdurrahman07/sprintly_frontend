import Link from "next/link";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionBadge from "../shared/SectionBadge";

export function HeroSection() {
  return (
    <section
      className="pt-20 pb-24 md:pb-28 text-center px-4 max-w-5xl mx-auto"
      id="product"
    >
      <SectionBadge icon={true} content="New · Built for high-velocity teams" />

      <Heading as="h1" className="mb-6">
        Stop coordinating projects by hand
      </Heading>

      <Text size="lg" className="max-w-2xl mx-auto mb-8">
        Sprintly replaces ad-hoc spreadsheets and chat threads with one shared
        system for projects, tasks and team assignments.
      </Text>

      <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
        <Button size="lg">
          <Link href="#pricing">See our plans</Link>
        </Button>
        <Button size="lg" variant="secondary">
          <Link href="#how-it-works">See how it works</Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mb-14">
        <svg
          className="w-4 h-4 text-success"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        No credit card required · 14-day free trial
      </p>

      {/* Floating Kanban Preview */}
      <div className="max-w-5xl mx-auto bg-card rounded-2xl p-4 md:p-6 shadow-[0_20px_50px_rgba(37,99,235,0.07),0_4px_16px_rgba(0,0,0,0.04)] border border-border text-left">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-muted"></span>
              <span className="w-3 h-3 rounded-full bg-muted"></span>
              <span className="w-3 h-3 rounded-full bg-muted"></span>
            </div>
            <div className="h-4 w-px bg-border mx-1"></div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span className="text-sm font-semibold text-foreground">
                Sprint 24 · Q1 Core Roadmap
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-muted text-foreground font-medium">
              All Tasks
            </span>
            <span className="px-2.5 py-1 rounded-full text-muted-foreground hover:text-foreground transition cursor-pointer">
              Assigned to me
            </span>
            <span className="hidden sm:inline-block text-muted-foreground font-mono text-[11px] ml-2">
              8 active
            </span>
          </div>
        </div>

        {/* Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/50 p-4 rounded-xl">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  To do
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-card px-2 py-0.5 rounded-full border border-border">
                3
              </span>
            </div>
            <div className="bg-card rounded-xl p-3.5 shadow-sm border border-border space-y-3">
              <div className="text-xs font-semibold text-foreground leading-snug">
                Migrate auth service to v2 API specs
              </div>
              <div className="flex items-center justify-between pt-1">
                <Badge variant="destructive">High</Badge>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-muted-foreground">
                    Today
                  </span>
                  <span className="w-5 h-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">
                    MK
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-3.5 shadow-sm border border-border space-y-3">
              <div className="text-xs font-semibold text-foreground leading-snug">
                Update webhook retry payloads
              </div>
              <div className="flex items-center justify-between pt-1">
                <Badge variant="secondary">Low</Badge>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-muted-foreground">
                    2d ago
                  </span>
                  <span className="w-5 h-5 rounded-full bg-primary-subtle text-primary-subtle-foreground text-[10px] font-bold flex items-center justify-center">
                    RA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  In progress
                </span>
              </div>
              <span className="text-xs font-mono text-primary bg-primary-subtle px-2 py-0.5 rounded-full border border-primary-border">
                2
              </span>
            </div>
            <div className="bg-card rounded-xl p-3.5 shadow-sm border border-border space-y-3">
              <div className="text-xs font-semibold text-foreground leading-snug">
                Design onboarding checklist UX
              </div>
              <div className="flex items-center justify-between pt-1">
                <Badge variant="warning">Med</Badge>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-muted-foreground">
                    4h ago
                  </span>
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    TL
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-3.5 shadow-sm border border-border space-y-3">
              <div className="text-xs font-semibold text-foreground leading-snug">
                Audit PostgreSQL query indexes
              </div>
              <div className="flex items-center justify-between pt-1">
                <Badge variant="destructive">High</Badge>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-muted-foreground">
                    1d ago
                  </span>
                  <span className="w-5 h-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">
                    MK
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Done
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-card px-2 py-0.5 rounded-full border border-border">
                4
              </span>
            </div>
            <div className="bg-card rounded-xl p-3.5 shadow-sm border border-border space-y-2 opacity-80">
              <div className="text-xs font-medium text-muted-foreground line-through leading-snug">
                Export CSV billing summaries
              </div>
              <div className="flex items-center justify-between pt-1">
                <Badge variant="secondary">Low</Badge>
                <svg
                  className="w-4 h-4 text-success"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
