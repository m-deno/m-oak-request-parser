# m-oak-request-parser
一个基于oak通用的请求参数解析

# 请求参数解析
## get
get请求解析的参数最终会挂载到`context`的getParams参数上
```ts
import { Application, Router, Next, type BodyType, type BodyOptions } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import RequestParser from 'https://deno.land/x/m_oak_request_parser/mod.js'
// import { getParser, bodyParser } from 'https://deno.land/x/m_oak_request_parser/mod.js'

// 全局使用
const app = new Application();
const router = new Router();

app.use(RequestParser.getParser())

router.get("/upload", (ctx: any) => {
  const { name, age } = ctx.state['params']
  ctx.response.body = {
    name,
    age
  }
});

// 单独使用
router.get("/upload", RequestParser.getParser(), (ctx: any) => {
  const { name, age } = ctx.state['params']
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

### json
> post json
```ts
app.use(RequestParser.bodyParser())
ctx.response.body = ctx.state['body']
/* {
    "name": "mz",
    "obj": {
      "age": 19
    }
}*/
```
### urlencoded
> post form-encode
```ts
app.use(RequestParser.bodyParser())
ctx.response.body = ctx.state['body']
/* {
    "name": "mz",
    "obj": {
      "age": 19
    }
}*/
```
### text
> post text
```ts
app.use(RequestParser.bodyParser())
ctx.response.body = ctx.state['body']
/* {
  'text': xxx
}*/
```

完整示例
```ts
import { Application, Router, Next, type BodyType, type BodyOptions } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import RequestParser from 'https://deno.land/x/m_oak_request_parser/mod.js'
// import { getParser, bodyParser } from 'https://deno.land/x/m_oak_request_parser/mod.js'

const app = new Application();
const router = new Router();

app.use(RequestParser.bodyParser())

router.post("/upload", (ctx: any) => {
  ctx.response.body = ctx.state['body']
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('服务运行于： http://localhost:9000');
await app.listen({ port: 9000 });
```