# Kanban Board

Real-time collaborative task board built with React, Express, PostgreSQL, and Socket.IO.

## Quick Start

```bash
# 1. Clone and enter the project
cd kanban

# 2. Copy environment file
cp .env.example .env

# 3. Start everything
docker compose up --build
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health check**: http://localhost:4000/health

## Architecture

```
kanban/
├── docker-compose.yml
├── .env.example
├── backend/
│   ├── server.js        # Express + Socket.IO
│   ├── schema.sql       # PostgreSQL schema (auto-run on first start)
│   ├── package.json
│   └── Dockerfile
└── frontend/
    ├── src/
│   ├── App.jsx      # Full React app
│   ├── main.jsx
│   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── Dockerfile
```

## API Endpoints

| Method | Path            | Description       |
|--------|-----------------|-------------------|
| GET    | /tasks          | List all tasks    |
| POST   | /tasks          | Create a task     |
| PATCH  | /tasks/:id      | Update a task     |
| DELETE | /tasks/:id      | Delete a task     |

## Real-time Events (Socket.IO)

| Event          | Payload          |
|----------------|------------------|
| `task:created` | Full task object |
| `task:updated` | Full task object |
| `task:deleted` | `{ id }`         |

## Task Schema

```sql
id          UUID PRIMARY KEY
title       TEXT NOT NULL
description TEXT
status      TEXT  -- 'todo' | 'inprogress' | 'done'
author      TEXT NOT NULL
created_at  TIMESTAMPTZ
updated_at  TIMESTAMPTZ
```

## Development (without Docker)

```bash
# Start Postgres locally then:

# Backend
cd backend && npm install
DATABASE_URL=postgres://kanban:kanban_secret@localhost:5432/kanban node server.js

# Frontend
cd frontend && npm install
VITE_API_URL=http://localhost:4000 npm run dev
```
