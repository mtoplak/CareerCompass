"use client";
import { useEffect } from "react";

interface Props {
  eventName: string;
}

const HotjarEvent = ({ eventName }: Props) => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).hj) {
      try {
        (window as any).hj("event", eventName);
      } catch (e) {
      }
    }
  }, [eventName]);

  return null;
};

export default HotjarEvent;