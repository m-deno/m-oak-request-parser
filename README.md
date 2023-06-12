# m-oak-request-parser
一个基于oak通用的请求参数解析

# 请求参数解析
## get
get请求解析的参数最终会挂载到`context`的getParams参数上
```ts
import { Application, Router, Next, type BodyType, type BodyOptions } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import RequestParser from 'https://deno.land/x/m_oak_request_parser/mod.js'
// import { getParser, bodyParser } from 'https://deno.land/x/m_oak_request_parser/mod.js'

const app = new Application();
const router = new Router();

app.use(RequestParser.getParser())

router.get("/upload", (ctx: any) => {
  const { name, age } = ctx['getParams']
  ctx.response.body = {
    name,
    age
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('服务运行于： http://localhost:9000');
await app.listen({ port: 9000 });
```

## post
post请求解析的参数最终会挂载到`context`的body参数上
```ts
import { Application, Router, Next, type BodyType, type BodyOptions } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import RequestParser from 'https://deno.land/x/m_oak_request_parser/mod.js'
// import { getParser, bodyParser } from 'https://deno.land/x/m_oak_request_parser/mod.js'

const app = new Application();
const router = new Router();

app.use(RequestParser.bodyParser())

router.post("/upload", (ctx: any) => {
  ctx.response.body = ctx['body']
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('服务运行于： http://localhost:9000');
await app.listen({ port: 9000 });
```