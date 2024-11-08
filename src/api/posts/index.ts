import type { RouteHandler } from "@/types";
import { db } from "@db/index";

export const GET = (() => {
  const posts = db.query("SELECT * FROM posts").all();

  return Response.json(posts);
}) satisfies RouteHandler;

export const POST = (async (req) => {
  const reqBody = await req.json();

  // TODO: バリデーション
  const { title, body } = reqBody;

  const q = db.query("INSERT INTO posts (title, body) VALUES ($title, $body) RETURNING *");

  const result = q.get({ title, body });

  return Response.json(result, { status: 201 });
}) satisfies RouteHandler;
