"use client";

import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ResponsiveImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "custom";
  customAspectRatio?: string;
}

export function ResponsiveImage({
  src,
  alt,
  fallbackSrc = "https://img-c.udemycdn.com/course/480x270/637930_9a22_24.jpg",
  className,
  aspectRatio = "square",
  customAspectRatio,
  fill = true,
  width = 0,
  height = 0,
  onError,
  ...props
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setImgSrc(fallbackSrc);
    if (onError) {
      onError(new Error("Image failed to load"));
    }
  };

  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    custom: customAspectRatio ? `aspect-[${customAspectRatio}]` : "",
  };

  // If no width/height provided but fill is false, use default values
  const imageProps = !fill
    ? {
        width: width || 400,
        height: height || 225
      }
    : { fill };

  return (
    <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio], className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...imageProps}
        {...props}
      />
    </div>
  );
}
