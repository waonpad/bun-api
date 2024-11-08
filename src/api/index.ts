import type { RouteHandler } from "@/types";

export const GET = (() => {
  return new Response("Hello World!");
}) satisfies RouteHandler;
