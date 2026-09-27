import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub?: string;
      id?: string;
    };
    user: {
      sub?: string;
      id?: string;
    };
  }
}
