import { BodyType } from '../deps.ts'
import { BodyParser } from "./bodyParser.ts";

export class UrlencodedBodyParser extends BodyParser {
  methodType = 'application/x-www-form-urlencoded'
  bodyType: BodyType|undefined = 'form';

  async parse(ctx: any): Promise<any> {
    // 请求参数，默认以form进行解析
    const requestBody = await ctx.request.body({ type: this.bodyType });
    // 遍历解析结果
    const bodyValue: Record<string, unknown> = {}
    const urlencodedParams = await requestBody.value
    for (const [key, value] of urlencodedParams) {
      bodyValue[key] = value
    }
    return bodyValue
  }

}