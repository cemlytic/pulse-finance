import { FastifyInstance, FastifyPluginAsync } from "fastify";

export const devAuthRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.post("/auth/dev-token", async (_req, reply) => {
    if (!process.env.JWT_SECRET) {
      return reply.internalServerError(
        "JWT_SECRET environment variable is missing",
      );
    }
    const token = app.jwt.sign({ sub: "user_demo_101" }, { expiresIn: "1h" });

    return reply.code(200).send({ token });
  });
};
