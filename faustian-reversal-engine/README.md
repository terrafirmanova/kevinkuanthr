# Faustian Reversal Engine — Structural Navigation Dashboard

A full-stack dashboard for bidirectional traversal between causal platform structures and human reintegration pathways.

## Project Tree

```text
/faustian-reversal-engine
  /frontend
  /backend
  /database
  README.md
```

## Stack

- Frontend: React + D3 + Tailwind + Vite
- Backend: Node.js + Express
- Graph Engine: JSON graph seed (Neo4j-compatible schema concept)

## API Endpoints

- `GET /symptoms`
- `GET /graph/causal/:symptomId`
- `GET /graph/reintegration/:symptomId`
- `POST /session`
- `GET /session/:userId`

## Graph Schema

### Node Types

- symptom
- interface_feature
- algorithm
- behavioral_principle
- economic_model
- institutional_origin
- theoretical_origin
- nervous_system_state
- perceptual_state
- reintegration_intervention
- social_reintegration
- symbolic_reintegration
- agency_restoration

### Edge Types

- causes
- reinforces
- emerges_from
- modulates
- restores
- reverses

## Install

```bash
cd faustian-reversal-engine
npm install
```

## Run

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Session Payload Example

```json
{
  "userId": "demo-user",
  "symptomId": "sym_compulsive_scrolling",
  "likertInputs": {
    "agency_vs_algorithmic_modulation": 41,
    "embodiment_vs_abstraction": 36
  },
  "signals": {
    "dailyScrollMinutes": 180
  },
  "reintegrationProgress": {
    "mode": "causal",
    "currentNode": "alg_engagement_optimization"
  }
}
```

## Notes

- Longitudinal drift is computed as metric delta from the previous session per structural binary.
- The seed graph is in `database/seed.graph.json` and mirrored at `backend/src/data/seed.graph.json`.
