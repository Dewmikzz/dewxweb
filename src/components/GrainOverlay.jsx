import React from "react";

/**
 * GrainOverlay: Subtle animated film-grain texture overlay.
 * Applies across the entire site at near-invisible opacity.
 * Should always be the topmost non-interactive layer.
 */
export const GrainOverlay = () => (
  <div className="grain" aria-hidden="true" role="presentation" />
);
