import Database from 'better-sqlite3';

export const db = new Database('./urls.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS urls (
    code TEXT PRIMARY KEY,
    url TEXT NOT NULL
  )
`).run();
