import fs from "node:fs";
import path from "node:path";

const seedPath = path.resolve("src/data/seed.graph.json");
const seed = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

const CAUSAL_ORDER = [
  "symptom",
  "interface_feature",
  "algorithm",
  "behavioral_principle",
  "economic_model",
  "institutional_origin",
  "theoretical_origin"
];

const REINTEGRATION_ORDER = [
  "symptom",
  "nervous_system_state",
  "perceptual_state",
  "reintegration_intervention",
  "social_reintegration",
  "symbolic_reintegration",
  "agency_restoration"
];

class GraphEngine {
  constructor(graph = seed) {
    this.nodes = graph.nodes;
    this.edges = graph.edges;
    this.nodeMap = new Map(this.nodes.map((node) => [node.id, node]));
  }

  getSymptoms() {
    return this.nodes.filter((node) => node.type === "symptom");
  }

  getChain(symptomId, order) {
    const chain = [];
    let cursor = symptomId;

    for (let i = 0; i < order.length; i += 1) {
      const expectedType = order[i];
      const node = this.nodeMap.get(cursor);
      if (!node || node.type !== expectedType) break;
      chain.push(node);
      if (i === order.length - 1) break;

      const next = this.edges.find(
        (edge) => edge.source === cursor && this.nodeMap.get(edge.target)?.type === order[i + 1]
      );
      if (!next) break;
      cursor = next.target;
    }

    return {
      nodes: chain,
      edges: this.edges.filter(
        (edge) =>
          chain.some((node) => node.id === edge.source) && chain.some((node) => node.id === edge.target)
      )
    };
  }

  getCausalChain(symptomId) {
    return this.getChain(symptomId, CAUSAL_ORDER);
  }

  getReintegrationChain(symptomId) {
    return this.getChain(symptomId, REINTEGRATION_ORDER);
  }
}

export const graphEngine = new GraphEngine();
