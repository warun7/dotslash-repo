import React, { useState } from "react";
import { cn } from "../../utils/cn";

export const CardSpotlight = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800 transition-transform duration-300 hover:scale-105",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 