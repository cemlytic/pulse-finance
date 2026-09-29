import { verifyToken } from "@clerk/backend";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const isDevAuthEnabled = process.env.ENABLE_DEV_AUTH === "true";
  const hasDevHeader = request.headers["x-dev-auth"] === "true";

  if (isDevAuthEnabled && hasDevHeader) {
    try {
      await request.jwtVerify();
      const decodedUser = request.user as { sub?: string; id?: string };
      const userId = decodedUser.sub || decodedUser.id;

      if (!userId) {
        return reply.status(401).send({
          statusCode: 401,
          error: "Unauthorized",
          message: "User ID not found in dev token payload",
        });
      }

      request.user = { id: userId };
      return;
    } catch {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid or expired dev token",
      });
    }
  }

  try {
    const rawToken = request.headers.authorization?.replace("Bearer ", "");

    if (!rawToken) {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
        message: "Missing bearer token",
      });
    }

    const verified = await verifyToken(rawToken, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    request.user = { id: verified.sub };
  } catch {
    return reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
      message: "Authentication required or token expired.",
    });
  }
}
