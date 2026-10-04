"use client";

import Link from "next/link";
import { SectionHeader, Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetPlans } from "@/hooks/plan.hooks";
import type { SubscriptionPlan } from "@/types/plan.types";

const planContent: Record<SubscriptionPlan, { description: string; features: string[] }> = {
  FREE: {
    description: "A simple starting point for keeping team work organized.",
    features: ["Project and task tracking", "Team collaboration", "Progress visibility"],
  },
  PRO: {
    description: "For teams that need more control over their active work.",
    features: [
      "Up to 2 projects",
      "Task assignment & comments",
      "Advanced analytics & audit logs",
      "Priority support",
      "Custom role permissions",
    ],
  },
  ENTERPRISE: {
    description: "For established teams coordinating work across a broader portfolio.",
    features: [
      "Up to 5 projects",
      "Task assignment & comments",
      "Advanced analytics & audit logs",
      "Priority support",
      "Custom role permissions",
    ],
  },
};

export function PricingSection() {
  const { data, isPending, isError } = useGetPlans();
  const plans = data?.data ?? [];

  return (
    <section className="py-24 max-w-6xl mx-auto px-4" id="pricing">
      <SectionHeader
        badge="Pricing"
        title="Simple plans for growing teams"
        description="Pick a plan and start managing projects today. Transparent pricing with local billing."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch">
        {isPending && (
          <p className="md:col-span-2 text-center text-sm text-muted-foreground">
            Loading plans...
          </p>
        )}
        {isError && (
          <p className="md:col-span-2 text-center text-sm text-muted-foreground">
            Plans could not be loaded. Please try again later.
          </p>
        )}
        {!isPending && !isError && plans.length === 0 && (
          <p className="md:col-span-2 text-center text-sm text-muted-foreground">
            No plans are available right now.
          </p>
        )}
        {plans.map((plan) => {
          const isPro = plan.name === "PRO";
          const content = planContent[plan.name];
          const formattedPrice = new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: plan.currency,
            maximumFractionDigits: 0,
          }).format(Number(plan.price));

          return (
            <Card
              key={plan.id}
              data-plan-id={plan.id}
              className={`p-8 flex flex-col justify-between relative ${
                isPro
                  ? "bg-primary-subtle/50 border-2 border-primary/40 shadow-lg"
                  : ""
              }`}
            >
              {isPro && (
                <div className="absolute -top-3.5 right-6">
                  <span className="bg-primary text-primary-foreground text-[11px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <div className="mb-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isPro ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Tier
                  </span>
                  <Heading as="h3" className="mt-1">
                    {plan.name}
                  </Heading>
                </div>
                <div className="mb-3">
                  <span className="text-4xl font-extrabold text-foreground">
                    {formattedPrice}
                  </span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <Text size="sm" className="mb-6">
                  {content.description}
                </Text>

                <div
                  className={`border-t ${
                    isPro ? "border-primary-border" : "border-border"
                  } pt-6 mb-8`}
                >
                  <ul className="space-y-3.5 text-sm text-foreground">
                    {content.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
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
              <Button variant={isPro ? "primary" : "secondary"} className="w-full">
                <Link href={`/manager/billing/my-bill/?planId=${plan.id}`}>Choose {plan.name}</Link>
              </Button>
            </Card>
          );
        })}
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
