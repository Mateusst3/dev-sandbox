import Fastify from "fastify";

const server = Fastify({ logger: true });

server.get("/health", async () => ({ ok: true }));

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "0.0.0.0";

server.listen({ port, host }).catch((error) => {
  server.log.error(error);
  process.exit(1);
});
