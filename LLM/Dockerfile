FROM ollama/ollama:latest

ENV OLLAMA_MODEL=llama3.2:1b

COPY entrypoint.sh /entrypoint.sh

EXPOSE 11434

ENTRYPOINT ["/entrypoint.sh"]
