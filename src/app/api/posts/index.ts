import type { RouteHandler } from "@/types";
import { db } from "@db/index";
import type { Post } from "@db/schemas";

export const GET = (() => {
  const posts = db.query<Post, null>("SELECT * FROM posts").all(null);

  return Response.json(posts);
}) satisfies RouteHandler;

export const POST = (async (req) => {
  const reqBody = await req.json();

  // TODO: バリデーション
  const { title, body } = reqBody;

  const result = db
    .query<Post, Omit<Post, "id">>("INSERT INTO posts (title, body) VALUES ($title, $body) RETURNING *")
    .get({ title, body });

  if (!result) {
    return Response.json("Post creation failed", { status: 500 });
  }

  return Response.json(result, { status: 201 });
}) satisfies RouteHandler;
