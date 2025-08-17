import { serveStatic } from "./router.ts"
import { Routes, allowedToAccessData } from "../../index"
import fs from "fs";
import {handleSocketMessage, handleSocketOpen, handleSocketClose, handleSocketDrain} from "../../socket.ts"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = new Routes();
var router = {loaded: false}
const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const path = new URL(request.url).pathname
    if (path == "socket") {
      if (server.upgrade(request)) {
        return;
      }
      return new Response("Upgrade failed", { status: 500 });
    }
    if (!router.loaded) {
      router = JSON.parse(await Bun.file("./data/routes.json").text())
      router.loaded = true
    }
    if (router[request.method + path]) {
      if (!router[request.method + path].handler.bypassAuth) {
        let allowed = allowedToAccessData(request)
        if (typeof (allowed) != typeof(true)) {
          return allowed;
        }
      }
      const handler = eval(`routes.${router[request.method + path].handler}`)
      return handler(request);
    } else {
      if (request.method == "GET" && fs.existsSync(`./static/${path}`)) {
        if (path.includes(".")){
          return serveStatic(path, path.split(".")[1])
        }
      }
      return new Response(Bun.file("./html/404.html"))
    }
  },
  websocket: {
    idleTimeout: 960,
    message(ws, message) {
      handleSocketMessage(ws, message)
    },
    open(ws) {
      handleSocketOpen(ws)
    },
    close(ws, code, message) {
      handleSocketClose(ws, code, message)
    },
    drain(ws) {
      handleSocketDrain(ws)
    },
  }
})
console.log(`Listening on localhost:${server.port}`);