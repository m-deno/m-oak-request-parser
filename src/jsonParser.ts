import { BodyType } from '../deps.ts'
import { BodyParser } from "./bodyParser.ts"

export class JsonBodyParser extends BodyParser {
  methodType = 'application/json'
  bodyType: BodyType|undefined = 'json';

  async parse(ctx: any): Promise<any> {
    // 请求参数
    const requestBody = await ctx.request.body({ type: this.bodyType });
    const bodyValue = await requestBody.value
    return bodyValue
  }
}