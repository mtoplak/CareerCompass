"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconArrowDown } from "@/components/ui/icons";

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "bg-background absolute -top-10 right-4 z-10 transition-opacity duration-300 sm:right-8 md:top-2",
        isAtBottom ? "opacity-0" : "opacity-100",
        className,
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Pomaknite se na dno</span>
    </Button>
  );
}
