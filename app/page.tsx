"use client"

import Controls from "@/components/Controls";
import MainSection from "@/components/MainSection";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Controls />
    </div>
  );
}
