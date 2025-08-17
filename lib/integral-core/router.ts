const routesPath = "../../data/routes.json";
export function GET(path: string, bypassCanAccess=false): Function {
  async function addGETPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`GET: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`GET${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addGETPath
}
export function POST(path: string, bypassCanAccess=false): Function {
  async function addPOSTPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`POST: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`POST${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addPOSTPath
}
export function PUT(path: string, bypassCanAccess=false): Function {
  async function addPUTPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`PUT: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`PUT${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addPUTPath
}
export function PATCH(path: string, bypassCanAccess=false): Function {
  async function addPATCHPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`PATCH: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`PATCH${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addPATCHPath
}
export function DELETE(path: string, bypassCanAccess=false): Function {
  async function addDELETEPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`DELETE: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`DELETE${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addDELETEPath
}
export function CONNECT(path: string, bypassCanAccess=false): Function {
  async function addCONNECTPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`CONNECT: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`CONNECT${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addCONNECTPath
}
export function HEAD(path: string, bypassCanAccess=false): Function {
  async function addHEADPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`HEAD: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`HEAD${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addHEADPath
}
export function OPTIONS(path: string, bypassCanAccess=false): Function {
  async function addOPTIONSPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`OPTIONS: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`OPTIONS${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addOPTIONSPath
}
export function TRACE(path: string, bypassCanAccess=false): Function {
  async function addTRACEPath(target: any, key: string, descriptor: PropertyDescriptor): Promise<void> {
    console.log(`TRACE: Loaded PATH: ${path} to ${descriptor.value.name}`)
    let routes = JSON.parse(await Bun.file(routesPath).text())
    routes[`TRACE${path}`] = {
      handler: descriptor.value.name,
      bypassAuth: bypassCanAccess,
    }
    await Bun.write(routesPath, JSON.stringify(routes))
  }
  return addTRACEPath
}
function h(type: string, cacheData: boolean | null, cookie: string | null) {
  var ret;
  if (!type.includes("/")) {
    //RESPONSE type inference
    if (type == "jpg" || type == "png" || type == "jpeg" || type == "svg" || type == "webp") {
      type = "image/" + type
    } else if (type == "mp3"){
      type = "audio/" + type
    } else {
      type = "text/" + type
    }
  }
  if (cacheData) {
    ret = {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=600000",
      },
    };
  } else {
    ret = { headers: { "Content-Type": type } };
  }
  if (cookie) {
    ret.headers["Set-Cookie"] = cookie + " HttpOnly; Secure; SameSite=Strict";
  }
  return ret
}
export function serveFile(path:string, type:string, cacheData: boolean | null, cookie: string | null) {
  return new Response(Bun.file(path), h(type, cacheData, cookie))
}
export function serveStatic(name: string, type:string) {
  return new Response(Bun.file(`../../static${name}`), h(type, true))
}