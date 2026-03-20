# Initial Setup

This project uses Docker Compose to run all services with one command.

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)

## Run Everything

From the repository root:

```bash
docker compose up --build
```

## Services

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`
- PostgreSQL: `localhost:5432`
- Ollama: `http://localhost:11434`

## Notes

- The first run of the Ollama container will download the base model (`llama3.2:1b`).
- PostgreSQL credentials are in `DataBase/postgres.env`.
- Backend connection string is in `Backend/.env`.
