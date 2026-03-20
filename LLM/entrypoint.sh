#!/usr/bin/env sh
set -e

ollama serve &
sleep 2

if [ -n "${OLLAMA_MODEL:-}" ]; then
  ollama pull "$OLLAMA_MODEL"
fi

wait
