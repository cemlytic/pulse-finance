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

  // 2. Production (Clerk verification) path
  try {
    // TODO: Enable this one the mobile app (apps/mobile) is wired app.
    // @clerk/backend's verifyToken
    // const rawToken = request.headers.authorization?.replace("Bearer ", "");
    // const session = await verifyToken(rawToken, { secretKey: process.env.CLERK_SECRET_KEY });
    // request.user = { id: session.sub };

    await request.jwtVerify();
    const tokenUserId = request.user.sub || request.user.id;

    if (!tokenUserId) {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
        message: "User ID not found in token",
      });
    }

    request.user = { id: tokenUserId };
  } catch {
    return reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
      message: "Authentication required or token expired.",
    });
  }
}
