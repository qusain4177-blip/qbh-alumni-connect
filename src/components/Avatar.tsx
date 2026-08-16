import { useState } from "react";
import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  src?: string | null;
  size?: "sm" | "lg";
  className?: string;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ name, src, size = "sm", className }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImg = src && !errored;
  const sizeClass =
    size === "lg"
      ? "h-32 w-32 sm:h-40 sm:w-40 text-3xl"
      : "h-14 w-14 text-xl";

  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-full bg-navy font-display font-semibold text-gold",
        sizeClass,
        className,
      )}
    >
      {showImg ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
