import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { graphEngine } from "../services/graphEngine.js";
import { computeBinaryVector, withDrift } from "../services/metricsService.js";
import { sessionStore } from "../services/sessionStore.js";

const router = Router();

router.get("/symptoms", (_req, res) => {
  res.json(graphEngine.getSymptoms());
});

router.get("/graph/causal/:symptomId", (req, res) => {
  res.json(graphEngine.getCausalChain(req.params.symptomId));
});

router.get("/graph/reintegration/:symptomId", (req, res) => {
  res.json(graphEngine.getReintegrationChain(req.params.symptomId));
});

router.post("/session", (req, res) => {
  const { userId, symptomId, likertInputs = {}, signals = {}, reintegrationProgress = {} } = req.body;

  if (!userId || !symptomId) {
    res.status(400).json({ message: "userId and symptomId are required" });
    return;
  }

  const previous = sessionStore.getByUser(userId).at(-1);
  const metrics = computeBinaryVector(likertInputs, signals);
  const metricsWithDrift = withDrift(metrics, previous?.metrics);

  const session = {
    id: uuidv4(),
    userId,
    symptomId,
    createdAt: new Date().toISOString(),
    symptomInputs: { likertInputs, signals },
    reintegrationProgress,
    metrics: metricsWithDrift
  };

  sessionStore.save(session);
  res.status(201).json(session);
});

router.get("/session/:userId", (req, res) => {
  res.json(sessionStore.getByUser(req.params.userId));
});

export default router;
