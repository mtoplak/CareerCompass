"use client";
import { useEffect } from "react";

interface Props {
  eventName: string;
}

const HotjarEvent = ({ eventName }: Props) => {
  useEffect(() => {
    // wait until hj exists
    if (typeof window !== "undefined" && (window as any).hj) {
      try {
        (window as any).hj("event", eventName);
      } catch (e) {
        // fail silently in dev if hj not loaded yet
      }
    }
  }, [eventName]);

  return null;
};

export default HotjarEvent;