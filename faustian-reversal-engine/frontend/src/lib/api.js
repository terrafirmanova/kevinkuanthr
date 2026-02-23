import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000"
});

export async function fetchSymptoms() {
  const { data } = await api.get("/symptoms");
  return data;
}

export async function fetchCausal(symptomId) {
  const { data } = await api.get(`/graph/causal/${symptomId}`);
  return data;
}

export async function fetchReintegration(symptomId) {
  const { data } = await api.get(`/graph/reintegration/${symptomId}`);
  return data;
}

export async function fetchSessions(userId) {
  const { data } = await api.get(`/session/${userId}`);
  return data;
}

export async function createSession(payload) {
  const { data } = await api.post("/session", payload);
  return data;
}
