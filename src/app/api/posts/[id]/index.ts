import type { RouteHandler } from "@/types";
import { db } from "@db/index";
import type { Post } from "@db/schemas";

export const GET = ((_, { params }) => {
  const id = Number(params.id);

  const post = db.query<Post, Pick<Post, "id">>("SELECT * FROM posts WHERE id = $id").get({ id });

  if (!post) {
    return Response.json("Post not found", { status: 404 });
  }

  return Response.json(post);
}) satisfies RouteHandler;

export const PATCH = (async (req, { params }) => {
  const id = Number(params.id);

  const reqBody = await req.json();

  // TODO: バリデーション
  const { title, body } = reqBody;

  const result = db
    .query<Post, Post>("UPDATE posts SET title = $title, body = $body WHERE id = $id RETURNING *")
    .get({ id, title, body });

  if (!result) {
    return Response.json("Post update failed", { status: 500 });
  }

  return Response.json(result, { status: 200 });
}) satisfies RouteHandler;

export const DELETE = ((_, { params }) => {
  const id = Number(params.id);

  const result = db.query<never, Pick<Post, "id">>("DELETE FROM posts WHERE id = $id").run({ id });

  if (result.changes === 0) {
    return Response.json("Post deletion failed", { status: 500 });
  }

  return Response.json(null, { status: 204 });
}) satisfies RouteHandler;
