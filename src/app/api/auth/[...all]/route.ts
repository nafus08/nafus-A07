import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

async function withAuthConfiguration(
  method: "GET" | "POST",
  request: Request,
) {
  if (!process.env.DATABASE_URL || !process.env.BETTER_AUTH_SECRET) {
    return Response.json(
      { message: "Authentication requires DATABASE_URL and BETTER_AUTH_SECRET." },
      { status: 503 },
    );
  }
  const handlers = toNextJsHandler(getAuth());
  return handlers[method](request);
}

export const GET = (request: Request) => withAuthConfiguration("GET", request);
export const POST = (request: Request) => withAuthConfiguration("POST", request);
