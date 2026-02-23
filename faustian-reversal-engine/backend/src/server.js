import express from "express";
import cors from "cors";
import api from "./routes/api.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(api);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Faustian Reversal Engine API listening on port ${port}`);
});
