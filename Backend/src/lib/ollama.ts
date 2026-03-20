type OllamaResponse = {
  response?: string;
};

export const generateWithOllama = async (prompt: string) => {
  const ollamaUrl = process.env.OLLAMA_URL ?? "http://localhost:11434";
  const ollamaModel = process.env.OLLAMA_MODEL ?? "llama3.2:1b";

  const response = await fetch(`${ollamaUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: ollamaModel,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ollama error: ${text}`);
  }

  const data = (await response.json()) as OllamaResponse;
  return data.response ?? "Entendi parcialmente. Pode explicar melhor?";
};
