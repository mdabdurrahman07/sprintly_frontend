import Link from "next/link";
import { SectionHeader, Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4" id="pricing">
      <SectionHeader
        badge="Pricing"
        title="Simple plans for growing teams"
        description="Pick a plan and start managing projects today. Transparent pricing with local billing."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch">
        {/* Tier 1: Eco */}
        <Card className="p-8 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                TIER
              </span>
              <Heading as="h3" className="mt-1">
                Eco
              </Heading>
            </div>
            <div className="mb-3">
              <span className="text-4xl font-extrabold text-foreground">
                ৳499
              </span>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
            <Text size="sm" className="mb-6">
              For small teams getting organized.
            </Text>

            <div className="border-t border-border pt-6 mb-8">
              <ul className="space-y-3.5 text-sm text-foreground">
                {[
                  "Unlimited projects",
                  "Task assignment & comments",
                  "Basic analytics",
                  "5 team members",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-primary shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Button variant="secondary" className="w-full">
            <Link href="#">Choose Eco</Link>
          </Button>
        </Card>

        {/* Tier 2: Pro */}
        <Card className="bg-primary-subtle/50 border-2 border-primary/40 p-8 flex flex-col justify-between relative shadow-lg">
          <div className="absolute -top-3.5 right-6">
            <span className="bg-primary text-primary-foreground text-[11px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
              MOST POPULAR
            </span>
          </div>

          <div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                TIER
              </span>
              <Heading as="h3" className="mt-1">
                Pro
              </Heading>
            </div>
            <div className="mb-3">
              <span className="text-4xl font-extrabold text-foreground">
                ৳999
              </span>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
            <Text size="sm" className="mb-6">
              For teams that need more control and scale.
            </Text>

            <div className="border-t border-primary-border pt-6 mb-8">
              <ul className="space-y-3.5 text-sm text-foreground">
                {[
                  "Everything in Eco",
                  "Advanced analytics & audit logs",
                  "Priority support",
                  "Unlimited team members",
                  "Custom role permissions",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-primary shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className={i === 0 ? "font-medium" : ""}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Button className="w-full">
            <Link href="#">Choose Pro</Link>
          </Button>
        </Card>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8 flex items-center justify-center gap-1.5">
        <svg
          className="w-3.5 h-3.5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect height="11" rx="2" ry="2" width="18" x="3" y="11"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        Payments secured via bKash · Cancel anytime with zero penalty
      </p>
    </section>
  );
}
