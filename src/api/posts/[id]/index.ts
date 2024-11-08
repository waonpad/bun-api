import type { RouteHandler } from "@/types";
import { db } from "@db/index";

export const GET = ((_, { params }) => {
  const id = Number(params.id);

  const post = db.query("SELECT * FROM posts WHERE id = $id").get({ id });

  return Response.json(post);
}) satisfies RouteHandler;

export const PATCH = (async (req, { params }) => {
  const id = Number(params.id);

  const reqBody = await req.json();

  // TODO: バリデーション
  const { title, body } = reqBody;

  const q = db.query("UPDATE posts SET title = $title, body = $body WHERE id = $id RETURNING *");

  const result = q.get({ id, title, body });

  return Response.json(result, { status: 200 });
}) satisfies RouteHandler;

export const DELETE = ((_, { params }) => {
  const id = Number(params.id);

  db.query("DELETE FROM posts WHERE id = $id").run({ id });

  return Response.json(null, { status: 204 });
}) satisfies RouteHandler;
