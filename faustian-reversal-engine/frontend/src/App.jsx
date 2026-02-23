import { useEffect, useMemo, useState } from "react";
import {
  createSession,
  fetchCausal,
  fetchReintegration,
  fetchSessions,
  fetchSymptoms
} from "./lib/api";
import SymptomInputPanel from "./components/SymptomInputPanel";
import StructuralStackVisualizationPanel from "./components/StructuralStackVisualizationPanel";
import ReintegrationPathwayPanel from "./components/ReintegrationPathwayPanel";
import LongitudinalDriftVisualizationPanel from "./components/LongitudinalDriftVisualizationPanel";
import StructuralMetricsDashboardPanel from "./components/StructuralMetricsDashboardPanel";
import { useGraphTraversal } from "./hooks/useGraphTraversal";

const USER_ID = "demo-user";

export default function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [causalGraph, setCausalGraph] = useState({ nodes: [], edges: [] });
  const [reintegrationGraph, setReintegrationGraph] = useState({ nodes: [], edges: [] });
  const [likertInputs, setLikertInputs] = useState({});
  const [sessionHistory, setSessionHistory] = useState([]);
  const traversal = useGraphTraversal("causal");

  useEffect(() => {
    async function bootstrap() {
      const [symptomData, sessions] = await Promise.all([fetchSymptoms(), fetchSessions(USER_ID)]);
      setSymptoms(symptomData);
      setSessionHistory(sessions);
      if (symptomData[0]) {
        setSelectedSymptom(symptomData[0].id);
      }
    }

    bootstrap();
  }, []);

  useEffect(() => {
    if (!selectedSymptom) return;

    async function loadGraphs() {
      const [causal, reintegration] = await Promise.all([
        fetchCausal(selectedSymptom),
        fetchReintegration(selectedSymptom)
      ]);
      setCausalGraph(causal);
      setReintegrationGraph(reintegration);
      traversal.setFocusIndex(0);
    }

    loadGraphs();
  }, [selectedSymptom]);

  const activeGraph = traversal.mode === "causal" ? causalGraph : reintegrationGraph;

  const activeMetrics = useMemo(() => sessionHistory.at(-1)?.metrics ?? [], [sessionHistory]);

  const saveSession = async () => {
    const payload = {
      userId: USER_ID,
      symptomId: selectedSymptom,
      likertInputs,
      signals: {
        dailyScrollMinutes: 180
      },
      reintegrationProgress: {
        mode: traversal.mode,
        currentNode: activeGraph.nodes[traversal.focusIndex]?.id
      }
    };

    const session = await createSession(payload);
    setSessionHistory((prev) => [...prev, session]);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Faustian Reversal Engine — Structural Navigation Dashboard</h1>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => traversal.setMode("causal")} type="button">
            Causal Reversal
          </button>
          <button className="btn-secondary" onClick={() => traversal.setMode("reintegration")} type="button">
            Reintegration
          </button>
          <button className="btn-secondary" onClick={() => traversal.previous()} type="button">
            ←
          </button>
          <button className="btn-secondary" onClick={() => traversal.next(activeGraph.nodes.length)} type="button">
            →
          </button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4">
        <SymptomInputPanel
          symptoms={symptoms}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
          likertInputs={likertInputs}
          setLikertInputs={setLikertInputs}
          saveSession={saveSession}
          sessionHistory={sessionHistory}
        />

        <StructuralStackVisualizationPanel
          graph={activeGraph}
          focusIndex={traversal.focusIndex}
          setFocusIndex={traversal.setFocusIndex}
        />

        <div className="space-y-4">
          <StructuralMetricsDashboardPanel metrics={activeMetrics} />
          <LongitudinalDriftVisualizationPanel sessions={sessionHistory} />
          <ReintegrationPathwayPanel chain={reintegrationGraph.nodes} />
        </div>
      </div>
    </main>
  );
}
