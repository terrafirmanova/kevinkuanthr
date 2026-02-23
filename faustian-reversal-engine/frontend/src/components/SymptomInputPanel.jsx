const sliderKeys = [
  "agency_vs_algorithmic_modulation",
  "embodiment_vs_abstraction",
  "symbolic_coherence_vs_fragmentation",
  "attention_sovereignty_vs_capture"
];

export default function SymptomInputPanel({
  symptoms,
  selectedSymptom,
  setSelectedSymptom,
  likertInputs,
  setLikertInputs,
  saveSession,
  sessionHistory
}) {
  return (
    <section className="panel">
      <h2 className="panel-title">Symptom Input Panel</h2>
      <select
        className="field"
        value={selectedSymptom}
        onChange={(e) => setSelectedSymptom(e.target.value)}
      >
        {symptoms.map((symptom) => (
          <option key={symptom.id} value={symptom.id}>
            {symptom.label}
          </option>
        ))}
      </select>

      <div className="space-y-3 mt-4">
        {sliderKeys.map((key) => (
          <label key={key} className="text-xs block">
            <span className="block mb-1 text-slate-300">{key.replaceAll("_", " ")}</span>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full"
              value={likertInputs[key] ?? 50}
              onChange={(e) => setLikertInputs((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
            />
          </label>
        ))}
      </div>

      <button type="button" className="btn-primary mt-4" onClick={saveSession}>
        Save Session
      </button>

      <h3 className="text-sm mt-6 mb-2 text-slate-300">Session History</h3>
      <div className="max-h-40 overflow-auto space-y-2 text-xs">
        {sessionHistory.map((session) => (
          <div key={session.id} className="bg-slate-900/90 p-2 rounded border border-slate-800">
            <p>{new Date(session.createdAt).toLocaleString()}</p>
            <p className="text-slate-400">{session.symptomId}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
