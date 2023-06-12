import { BodyType } from '../deps.ts'
import { BodyParser } from "./bodyParser.ts";

export class TextBodyParser extends BodyParser {
  methodType = 'text/plain'
  bodyType: BodyType|undefined = 'text';

  async parse(ctx: any): Promise<any> {
    // 请求参数，默认以form进行解析
    const requestBody = await ctx.request.body({ type: this.bodyType });
    // 遍历解析结果
    const bodyValue = await requestBody.value
    return {
      text: bodyValue
    }
  }

}