"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  name: string;
  logo?: string;
  website?: string;
  size: number;
  priority?: boolean;
};

// Site icons smaller than this look blurry when scaled up, so the initials are shown instead.
const MIN_ICON_SIZE = 64;

const getDomain = (website?: string) => {
  if (!website) return null;
  try {
    const url = new URL(website.includes("://") ? website : `https://${website}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

// Legal forms such as "d.o.o.", "d.d." or "s.p." are skipped.
const getInitials = (name: string) =>
  name
    .split(",")[0]
    .split(/\s+/)
    .filter((word) => /^\p{L}/u.test(word) && !/^(\p{L}\.)+\p{L}?\.?$/u.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const CompanyLogo = ({ name, logo, website, size, priority }: Props) => {
  // Logos in Firebase Storage are no longer served (the project is on the no-cost Spark plan),
  // so those companies fall back to their website's icon and then to their initials.
  const sources: { src: string; isSiteIcon: boolean }[] = [];
  if (logo && !logo.includes("firebasestorage.googleapis.com")) {
    sources.push({ src: logo, isSiteIcon: false });
  }
  const domain = getDomain(website);
  if (domain) {
    sources.push({
      src: `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
      isSiteIcon: true,
    });
  }

  const [sourceIndex, setSourceIndex] = useState(0);
  const source = sources[sourceIndex];

  if (!source) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
        style={{ width: size, height: size, fontSize: size * 0.35 }}
        aria-label={name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <Image
      key={source.src}
      src={source.src}
      alt={name}
      width="0"
      height="0"
      sizes="100vw"
      unoptimized={source.isSiteIcon}
      priority={priority}
      className="h-auto"
      style={{ width: size, maxHeight: size, objectFit: "contain" }}
      onError={() => setSourceIndex(sourceIndex + 1)}
      onLoad={(event) => {
        if (source.isSiteIcon && event.currentTarget.naturalWidth < MIN_ICON_SIZE) {
          setSourceIndex(sourceIndex + 1);
        }
      }}
    />
  );
};

export default CompanyLogo;
