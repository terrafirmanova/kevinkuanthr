import { STRUCTURAL_BINARIES } from "../data/structuralBinaries.js";

export function computeBinaryVector(likert = {}, signals = {}) {
  const signalBias = (signals.dailyScrollMinutes || 0) / 12;

  const metrics = STRUCTURAL_BINARIES.map((key, index) => {
    const likertValue = Number(likert[key] ?? 50);
    const weighted = Math.max(0, Math.min(100, Math.round(likertValue * 0.75 + (100 - signalBias) * 0.25 - index * 0.8)));
    return { key, value: weighted };
  });

  return metrics;
}

export function withDrift(currentMetrics, previousMetrics = []) {
  const previousMap = new Map(previousMetrics.map((m) => [m.key, m.value]));
  return currentMetrics.map((metric) => ({
    ...metric,
    delta: metric.value - (previousMap.get(metric.key) ?? metric.value)
  }));
}
