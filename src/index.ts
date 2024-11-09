import { FileSystemRouter, serve } from "bun";
import type { RouteHandler, RouteMethod, RouteModule } from "./types";

const main = async () => {
  // appディレクトリ配下のファイルをnextjsスタイルでルーティングする
  const router = new FileSystemRouter({
    style: "nextjs",
    dir: `${import.meta.dir}/app`,
  });

  const server = serve({
    // ポート等の設定 (https://bun.sh/docs/api/http#changing-the-port-and-hostname)
    //
    // 静的ルート (https://bun.sh/docs/api/http#static-routes)
    static: {
      "/favicon.ico": new Response("Not Found", { status: 404 }),
    },
    fetch: async (req) => {
      // りクエストの内容にマッチするルートのファイルを探す
      const matchedRoute = router.match(req);

      // ファイルが見つかった場合
      if (matchedRoute) {
        // ファイルをimportする
        const routeModule: RouteModule = await import(matchedRoute.filePath);

        const handler: RouteHandler | undefined = routeModule[req.method as RouteMethod];

        if (handler) {
          return await handler(req, {
            params: matchedRoute.params,
            searchParams: matchedRoute.query,
          });
        }

        return new Response("Method Not Allowed", { status: 405 });
      }

      return new Response("Not Found", { status: 404 });
    },
    // エラーハンドリング (https://bun.sh/docs/api/http#error-handling)
    // development: true でも errorコールバックを指定した場合はコールバックが優先される
    // error(error) {
    //   return new Response(`<pre>${error}\n${error.stack}</pre>`, {
    //     headers: {
    //       "Content-Type": "text/html",
    //     },
    //   });
    // },
  });

  console.log(server);
};

main();
