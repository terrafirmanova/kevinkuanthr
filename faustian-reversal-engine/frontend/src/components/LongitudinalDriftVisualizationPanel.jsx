import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function LongitudinalDriftVisualizationPanel({ sessions }) {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    if (!sessions.length) return;

    const width = 320;
    const height = 180;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const series = sessions.map((session, index) => ({
      x: index,
      y: d3.mean(session.metrics, (metric) => metric.value)
    }));

    const x = d3.scaleLinear().domain([0, series.length - 1]).range([20, width - 20]);
    const y = d3.scaleLinear().domain([0, 100]).range([height - 20, 20]);

    const line = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    svg
      .append("path")
      .datum(series)
      .attr("fill", "none")
      .attr("stroke", "#06b6d4")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [sessions]);

  return (
    <section className="panel">
      <h2 className="panel-title">Longitudinal Drift Visualization Panel</h2>
      <svg ref={ref} className="w-full h-44 bg-slate-950 border border-slate-800 rounded-md" />
    </section>
  );
}
