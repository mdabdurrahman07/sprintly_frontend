import { SectionHeader } from "@/components/ui/typography";
import { AccordionItem } from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "What is Sprintly?",
      answer:
        "Sprintly is a fast, utilitarian project-management platform crafted specifically for agile product engineering and design teams who prioritize velocity over spreadsheet clutter.",
      isOpenDefault: true,
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your workspace subscription at any time directly from the billing tab.",
    },
    {
      question: "How does billing with bKash work?",
      answer:
        "You will receive an automated bKash merchant payment link every month along with instant PDF receipts sent to your primary admin email.",
    },
    {
      question:
        "What's the difference between Manager, Member and Admin roles?",
      answer:
        "Admins have full access to billing and workspace settings. Managers can initiate sprints and adjust workflows, while Members focus on task updates and execution.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! Every workspace comes with a 14-day fully featured Pro trial without requiring a credit card or payment authorization.",
    },
  ];

  return (
    <section className="py-24 max-w-3xl mx-auto px-4" id="faq">
      <SectionHeader
        badge="Questions"
        title="Frequently asked questions"
        description="Everything you need to know about Sprintly and subscriptions."
      />

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpenDefault={faq.isOpenDefault}
          />
        ))}
      </div>
    </section>
  );
}
