import { HeroSection } from "@/components/sections/HeroSection";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";

const RootPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection/>
    </>
  );
};

export default RootPage;
