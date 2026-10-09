import Link from "next/link";
import Logo from "../shared/Logo";

export function Footer() {
  return (
    <footer className="px-4 pb-12">
      <div className="max-w-6xl mx-auto p-10 md:p-12 bg-card shadow-sm border border-border rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 flex flex-col items-start">
           <div className="mb-4"> <Logo/></div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
              Utilitarian project tracking for high-velocity teams. Move from
              ideas to execution with clear velocity.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              All systems operational
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-6 text-sm">
            <div>
              <span className="font-bold text-foreground mb-3.5 block">
                Product
              </span>
              <ul className="space-y-2.5 text-muted-foreground">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-foreground mb-3.5 block">
                Company
              </span>
              <ul className="space-y-2.5 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Customers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-foreground mb-3.5 block">
                Legal
              </span>
              <ul className="space-y-2.5 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© 2026 Sprintly Inc. All rights reserved. Design and Develop by MD Abdur Rahman Nur Jamil</span>
          <div className="flex items-center gap-6">
            <Link href="https://x.com/mabdurrahman07" className="hover:text-foreground transition">
              Twitter
            </Link>
            <Link href="https://github.com/mdabdurrahman07" className="hover:text-foreground transition">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/mdabdurrahman-dev/" className="hover:text-foreground transition">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
