import { Next } from "./deps.ts"
import { JsonBodyParser, UrlencodedBodyParser, TextBodyParser } from './src/index.ts'

/**
 * get 请求参数解析
 * 
 * @example 
 * ```ts
 * app.use(RequestParser.getParser())
 * 
 * router.get("/upload", (ctx: any) => {
 *   const { name, age } = ctx['getParams']
 *   ctx.response.body = { name, age }
 * });
 * ```
 * @returns oak handler
 */
const getParser = () => {
  return async (ctx: any, next: Next) => {
    // 获取请求参数
    const requestParams = ctx.request.url.searchParams
    // 遍历请求参数，重新组织数据
    const requestBody: Record<string, unknown> = {}
    for (const [key, value] of requestParams) {
      try {
        // 对数值、boolean进行解析
        const result = JSON.parse((value as string).toLowerCase())
        requestBody[key] = result
      } catch {
        requestBody[key] = value
      }
    }
    // 将解析得到的数据挂载到ctx上
    ctx.state['params'] = requestBody
    await next()
  }
}

/**
 * post 请求参数解析，包括urlencoded|json|text类型参数解析
 * 
 * @example
 * 
 * ```ts
 * // 包括urlencoded|json|text类型参数解析
 * app.use(RequestParser.bodyParser())
 *
 * router.post("/upload", (ctx: any) => {
 *   ctx.response.body = ctx['body']
 * });
 *
 * ```
 * 
 * @returns oak handler
 */
const bodyParser = () => {
  return async (ctx: any, next: Next) => {
    // 请求类型
    const contentType = ctx.request.headers.get("Content-Type");
    const parsers = [
      new JsonBodyParser(),
      new UrlencodedBodyParser(),
      new TextBodyParser(),
    ]
    // 查找可以解析的parser
    const parser = parsers.find((parser) => parser.canParse(contentType))
    // 找到解析器对数据进行解析
    const bodyValue = await parser?.parse(ctx) || {}
    // 将解析得到的数据挂载到ctx上
    ctx.state['body'] = bodyValue
    await next()
  }
}

export {
  getParser,
  bodyParser
}

export default {
  getParser,
  bodyParser
}