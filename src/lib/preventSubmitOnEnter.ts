import type React from "react";

export function preventSubmitOnEnter(event: React.KeyboardEvent<HTMLElement>) {
  if (event.key !== "Enter") return;

  const target = event.target as HTMLElement | null;
  if (!target) return;

  const tagName = target.tagName;
  if (
    tagName === "TEXTAREA" ||
    tagName === "BUTTON" ||
    target.getAttribute("data-allow-enter-submit") === "true"
  ) {
    return;
  }

  event.preventDefault();
}
