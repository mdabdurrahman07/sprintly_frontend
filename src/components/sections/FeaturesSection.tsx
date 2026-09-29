import { SectionHeader, Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4" id="features">
      <SectionHeader
        badge="Features"
        title="Everything your team needs"
        description="Purpose-built tools designed to keep fast-moving product teams completely aligned."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <Card className="md:col-span-2 p-8 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-full bg-primary-subtle text-primary flex items-center justify-center mb-5 border border-primary-border">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <Heading as="h3" className="mb-2">
              Real-time task tracking
            </Heading>
            <Text size="sm" className="max-w-xl mb-6">
              Track tasks seamlessly with live status updates, instant
              assignment shifts, and automated sprint burndown graphs that
              refresh without page reloading.
            </Text>
          </div>
          <div className="bg-muted/60 border border-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span>
              <span className="text-xs font-semibold text-foreground">
                Sprint Sync Active
              </span>
              <span className="text-[11px] text-muted-foreground">
                3 team members editing now
              </span>
            </div>
            <div className="flex -space-x-2">
              <span className="w-7 h-7 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center border-2 border-card">
                MK
              </span>
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center border-2 border-card">
                TL
              </span>
              <span className="w-7 h-7 rounded-full bg-chart-4 text-white text-[10px] font-semibold flex items-center justify-center border-2 border-card">
                RA
              </span>
            </div>
          </div>
        </Card>

        {/* Card 2 */}
        <Card className="bg-muted/40 p-6 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-full bg-card text-primary flex items-center justify-center mb-5 border border-border shadow-xs">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <Heading as="h4" className="mb-2">
              Role-based access
            </Heading>
            <Text size="sm">
              Fine-tune who can create sprints, assign teammates, or view
              billing. Admins, Managers, and Members have defined zones of
              control.
            </Text>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary"></span> 3 distinct
            permission tiers
          </div>
        </Card>

        {/* Card 3 */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-full bg-primary-subtle text-primary flex items-center justify-center mb-5 border border-primary-border">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <Heading as="h4" className="mb-2">
              Comments & activity log
            </Heading>
            <Text size="sm" className="mb-4">
              Contextual discussions inside each issue keep conversations
              directly tied to sprint goals.
            </Text>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 border border-border text-xs">
            <div className="flex items-center gap-1.5 text-foreground font-semibold mb-1">
              <span className="w-4 h-4 rounded-full bg-primary text-[9px] text-primary-foreground flex items-center justify-center font-bold">
                TL
              </span>
              <span>Tara Lin</span>
              <span className="text-[10px] text-muted-foreground font-normal">
                Just now
              </span>
            </div>
            <p className="text-muted-foreground text-[11px]">
              Merged design assets into the staging sprint!
            </p>
          </div>
        </Card>

        {/* Card 4 */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-full bg-primary-subtle text-primary flex items-center justify-center mb-5 border border-primary-border">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <Heading as="h4" className="mb-2">
              Email notifications
            </Heading>
            <Text size="sm">
              Digestible notifications when issues change status, deadlines
              shift, or mentions occur.
            </Text>
          </div>
          <span className="text-xs text-primary font-semibold mt-4">
            Smart digests included
          </span>
        </Card>

        {/* Card 5 */}
        <Card className="bg-muted/40 p-6 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-full bg-card text-primary flex items-center justify-center mb-5 border border-border shadow-xs">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" x2="8" y1="13" y2="13"></line>
                <line x1="16" x2="8" y1="17" y2="17"></line>
              </svg>
            </div>
            <Heading as="h4" className="mb-2">
              Audit logs
            </Heading>
            <Text size="sm">
              Immutable logging of team additions, security policy changes, and
              workspace lifecycle events.
            </Text>
          </div>
          <span className="text-xs text-muted-foreground font-medium mt-4">
            Compliance ready
          </span>
        </Card>

        {/* Card 6 */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-full bg-primary-subtle text-primary flex items-center justify-center mb-5 border border-primary-border">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect height="16" rx="2" ry="2" width="22" x="1" y="4"></rect>
                <line x1="1" x2="23" y1="10" y2="10"></line>
              </svg>
            </div>
            <Heading as="h4" className="mb-2">
              bKash billing
            </Heading>
            <Text size="sm">
              Frictionless localized payment processing via secure bKash gateway
              with automatic monthly receipt dispatch.
            </Text>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-success font-semibold mt-4">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Verified gateway
          </div>
        </Card>
      </div>
    </section>
  );
}
