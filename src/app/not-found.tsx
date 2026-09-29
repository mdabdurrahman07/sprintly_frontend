import SectionBadge from "@/components/shared/SectionBadge";
import { Button } from "@/components/ui/button";
import { Home, UserKey } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-5">
      <div>
        <SectionBadge icon={true} content="Error 404" />
      </div>
      <div className="flex items-center justify-center gap-5">
        <h1 className="text-2xl md:text-[256px] font-bold">4</h1>
        <h1 className="text-2xl md:text-[256px] font-bold">0</h1>
        <h1 className="text-2xl md:text-[256px] font-bold">4</h1>
      </div>
      <div>
        <p className="font-body-md text-body-md text-muted-foreground font-medium tracking-normal transition-opacity duration-300">
          The page you're looking for doesn't exist, was moved, or you may not
          <span>
            <br /> have access to it. Let's get you back on track.
          </span>
        </p>
      </div>

      <div className="flex justify-center items-center gap-5">
        <Link href="/">
          <Button>
            <span>
              <Home />
            </span>{" "}
            <span className="pl-2 text-xl">Go Home</span>
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="secondary">
            <span>
              <UserKey />
            </span>{" "}
            <span className="pl-2 text-xl">Login</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
