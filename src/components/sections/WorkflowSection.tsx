import { SectionHeader, Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

export function WorkflowSection() {
  const steps = [
    {
      step: "01",
      title: "Create a project",
      description: "Set up workspace and sprint cadences in seconds.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
      ),
    },
    {
      step: "02",
      title: "Assign work by role",
      description: "Delegate tasks to Members while Admins govern permissions.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      step: "03",
      title: "Track & comment",
      description: "Keep discussions and status transitions directly in context.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      step: "04",
      title: "Stay accountable",
      description: "Real-time velocity dashboards and completion reports.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-4" id="how-it-works">
      <SectionHeader
        badge="Workflow"
        title="How it works"
        description="Get your workspace running in four straightforward steps."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((item) => (
          <Card key={item.step} className="p-6 flex flex-col justify-between hover:border-border/80 transition">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-full bg-primary-subtle text-primary flex items-center justify-center font-bold text-sm">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-muted-foreground font-mono bg-muted px-2.5 py-1 rounded-full border border-border">
                  {item.step}
                </span>
              </div>
              <Heading as="h4" className="mb-2">{item.title}</Heading>
              <Text size="sm">{item.description}</Text>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}