export default function StructuralMetricsDashboardPanel({ metrics }) {
  return (
    <section className="panel">
      <h2 className="panel-title">Structural Metrics Dashboard Panel</h2>
      <div className="space-y-2 max-h-72 overflow-auto pr-1">
        {metrics.map((metric) => (
          <div key={metric.key} className="bg-slate-900 p-2 rounded border border-slate-800 text-xs">
            <p className="text-slate-200">{metric.key.replaceAll("_", " ")}</p>
            <p className="text-cyan-300">{metric.value}/100</p>
            <p className={metric.delta >= 0 ? "text-emerald-400" : "text-rose-400"}>
              Δ {metric.delta >= 0 ? "+" : ""}
              {metric.delta}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
