import { initTRPC } from "@trpc/server";
import fastify from "fastify";
import { z } from "zod";
import { fastifyTRPCOpenApiPlugin, type OpenApiMeta } from "trpc-to-openapi";
import {
  fastifyTRPCPlugin,
  type FastifyTRPCPluginOptions,
  type CreateFastifyContextOptions,
} from "@trpc/server/adapters/fastify";

const t = initTRPC.meta<OpenApiMeta>().create();

const appRouter = t.router({
  ping: t.procedure
    .meta({ openapi: { method: "GET", path: "/ping" } })
    .input(z.void())
    .output(z.object({ pong: z.boolean() }))
    .query(async () => {
      return { pong: true };
    }),
});

const server = fastify();

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter },
});

server.register(fastifyTRPCOpenApiPlugin, { router: appRouter });

void server
  .listen({ port: 3000 })
  .then(() => {
    console.log("Server listening on port 3000\n");
    console.log("Test this:");
    console.log("curl http://localhost:3000/ping");
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
