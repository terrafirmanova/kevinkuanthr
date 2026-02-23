export default function ReintegrationPathwayPanel({ chain = [] }) {
  return (
    <section className="panel">
      <h2 className="panel-title">Reintegration Pathway Panel</h2>
      <div className="space-y-2">
        {chain.map((node, idx) => (
          <div key={node.id} className="flex items-center gap-2 text-sm">
            <span className="text-cyan-400">{idx + 1}.</span>
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
