import { Application, Router, Next, type BodyType, type BodyOptions } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import RequestParser from '../mod.js'
// import { getParser, bodyParser } from '../mod.js'

const app = new Application();
const router = new Router();

app.use(RequestParser.getParser())
app.use(RequestParser.bodyParser())

router.post("/upload", (ctx: any) => {
  ctx.response.body = ctx['body']
});

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