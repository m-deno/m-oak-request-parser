import { BodyType } from '../deps.ts'

export abstract class BodyParser<T=any> {
  abstract methodType: string; // 网络请求对应的请求类型
  abstract bodyType: BodyType | undefined; // oka解析对应的 

  /**
   * 判断解析插件是否可以进行解析
   *
   * @param {string} type 请求类型如：application/json
   * @return {boolean}
   * @memberof BodyParser
   */
  canParse(type: string): boolean {
    if (!this.methodType || !type) {
      return false;
    }
    return this.methodType.toLowerCase() === type.toLowerCase();
  }

  /**
   * 请求数据解析
   * 
   * @param {Context} ctx oak请求上下文
   * @returns {*} 解析结果
   * @memberof BodyParser
   */
  abstract parse(ctx: any): Promise<T>;
}
