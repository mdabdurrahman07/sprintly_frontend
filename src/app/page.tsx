import Badge from "@/components/shared/Badge/Badge";
import Logo from "@/components/shared/Logo/Logo";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <div>
      This home Page
      <Button>Click Me</Button>
      <Button variant={"secondary"}>Click Me</Button>
      <Button variant={"outline"}>Click Me</Button>
      <Logo />
      <Badge icon={true} content="Built for high-velocity teams" />
    </div>
  );
};

export default HomePage;
