"use client";

import React from "react";
import Backdrop from "./Backdrop";
import { useGlobalData } from "@/context/GlobalDataContext";

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const globalData = useGlobalData();
  const albumArt = globalData?.music?.artwork || "/images/error-albumart.png";
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Backdrop imageUrl={albumArt} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
