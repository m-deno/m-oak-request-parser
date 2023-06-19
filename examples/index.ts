import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import RequestParser from '../mod.ts'
// import { getParser, bodyParser } from '../mod.js'

const app = new Application();
const router = new Router();

// app.use(RequestParser.getParser())
app.use(RequestParser.bodyParser())

router.post("/upload", (ctx: any) => {
  ctx.response.body = ctx.state['body']
});

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