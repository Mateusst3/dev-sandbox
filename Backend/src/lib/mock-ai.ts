const MOCK_RESPONSES = [
  "Interessante! Conte mais.",
  "Nao tenho certeza, mas parece legal!",
  "Hmm, e se tentassemos outra abordagem?",
  "Entendi parcialmente. Voce pode explicar melhor?",
];

export const generateMockResponse = () => {
  const index = Math.floor(Math.random() * MOCK_RESPONSES.length);
  return MOCK_RESPONSES[index] ?? MOCK_RESPONSES[0];
};
