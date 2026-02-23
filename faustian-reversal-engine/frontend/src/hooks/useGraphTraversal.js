import { useMemo, useState } from "react";

export function useGraphTraversal(initial = "causal") {
  const [mode, setMode] = useState(initial);
  const [focusIndex, setFocusIndex] = useState(0);

  const direction = useMemo(() => (mode === "causal" ? "reverse" : "reintegration"), [mode]);

  const next = (max) => setFocusIndex((idx) => Math.min(max - 1, idx + 1));
  const previous = () => setFocusIndex((idx) => Math.max(0, idx - 1));

  return { mode, setMode, focusIndex, setFocusIndex, next, previous, direction };
}
