import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function StructuralStackVisualizationPanel({ graph, focusIndex, setFocusIndex }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!graph?.nodes?.length || !ref.current) {
      return;
    }

    const width = 760;
    const height = 380;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const x = d3
      .scalePoint()
      .domain(graph.nodes.map((node) => node.id))
      .range([80, width - 80]);

    svg
      .selectAll("line")
      .data(graph.edges)
      .join("line")
      .attr("x1", (d) => x(d.source))
      .attr("x2", (d) => x(d.target))
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("stroke", "#334155")
      .attr("stroke-width", 2);

    svg
      .selectAll("circle")
      .data(graph.nodes)
      .join("circle")
      .attr("cx", (d) => x(d.id))
      .attr("cy", height / 2)
      .attr("r", 10)
      .attr("fill", (_d, i) => (i <= focusIndex ? "#22d3ee" : "#64748b"))
      .style("cursor", "pointer")
      .on("click", (_e, d) => setFocusIndex(graph.nodes.findIndex((node) => node.id === d.id)))
      .transition()
      .duration(300)
      .attr("r", (_d, i) => (i === focusIndex ? 24 : 14));

    svg
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .attr("x", (d) => x(d.id))
      .attr("y", height / 2 + 42)
      .attr("text-anchor", "middle")
      .attr("fill", "#cbd5e1")
      .attr("font-size", 11)
      .text((d) => d.label);
  }, [graph, focusIndex, setFocusIndex]);

  return (
    <section className="panel col-span-2">
      <h2 className="panel-title">Structural Stack Visualization Panel</h2>
      <svg ref={ref} className="w-full h-[380px] bg-slate-950 rounded-md border border-slate-800" />
    </section>
  );
}
