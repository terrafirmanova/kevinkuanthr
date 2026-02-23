import fs from "node:fs";
import path from "node:path";

const STORE_PATH = path.resolve("src/data/sessions.json");

function readStore() {
  if (!fs.existsSync(STORE_PATH)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
}

function writeStore(payload) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(payload, null, 2));
}

export class SessionStore {
  getByUser(userId) {
    return readStore().filter((session) => session.userId === userId);
  }

  save(session) {
    const existing = readStore();
    existing.push(session);
    writeStore(existing);
    return session;
  }
}

export const sessionStore = new SessionStore();
