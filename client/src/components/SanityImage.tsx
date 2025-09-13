"use client";

import Image from "next/image";
import { ImageLoaderProps } from "next/image";

// Custom loader for Sanity images that works with Next.js optimization
const sanityLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // If src already has parameters, add to them, otherwise start fresh
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${width}&q=${quality || 75}&fit=clip&auto=format`;
};

interface SanityImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export default function SanityImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  sizes,
  priority = false,
  objectFit = "cover",
}: SanityImageProps) {
  if (!src) return null;

  const objectFitClass =
    objectFit === "contain"
      ? "object-contain"
      : objectFit === "cover"
        ? "object-cover"
        : objectFit === "fill"
          ? "object-fill"
          : objectFit === "none"
            ? "object-none"
            : "object-scale-down";

  if (fill) {
    return (
      <Image
        loader={sanityLoader}
        src={src}
        alt={alt}
        fill
        className={`${objectFitClass} ${className || ""}`}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      loader={sanityLoader}
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 400}
      className={`${className || ""}`}
      sizes={sizes}
      priority={priority}
      style={{ width: "auto", height: "auto", maxWidth: "100%" }}
    />
  );
}
