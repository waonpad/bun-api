export type RouteHandler = (
  req: Request,
  { params, searchParams }: { params: Record<string, string>; searchParams: Record<string, string> },
) => Promise<Response> | Response;

export type RouteMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export type RouteModule = {
  [key in RouteMethod]?: RouteHandler;
};
