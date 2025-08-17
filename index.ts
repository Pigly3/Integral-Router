import {GET, POST, PATCH, PUT, DELETE, CONNECT, HEAD, OPTIONS, TRACE, serveFile} from "./lib/integral-core/router"
export function allowedToAccessData(request: Request): true | Response {
  let allowed = true;
  return true; //return
}
export class Routes {
  @GET("/", true)
  home(): Response {
    return new Response(Bun.file("./html/index.html"))
  }

}