import React from "react";

interface SkeletonProps {
  className?: string;
  count?: number;
}

/**
 * Placeholder de carga simple basado en animación de pulsos.
 */
export default function Skeleton({ className = "", count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-muted-30 rounded ${className}`}
        />
      ))}
    </>
  );
}
