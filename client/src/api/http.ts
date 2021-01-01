import { AxiosInstance, AxiosStatic } from 'axios';
import * as pathToRegExp from 'path-to-regexp';
import { Response } from './interface';

// 判断是否符合返回调用方的需求
const isObjectHasAttr = (res?: Partial<Response>): Response | null => {
  return res?.code === 200 ? (res as Response) : null;
};

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'all';

/**
 * 请求类
 *
 * @class BaseHttp
 */
class BaseHttp {
  // 请求实例
  public httpInstance: AxiosInstance & AxiosStatic;
  // 请求数据
  private data: any = null;
  // request query
  private params: any = null;
  // 请求头
  private headers: any = null;

  private method: Method = 'get';

  private host = '';

  private url = '';

  public constructor(axiosInstance: AxiosInstance & AxiosStatic) {
    this.httpInstance = axiosInstance;
  }

  /**
   * 设置请求 query
   *
   * @param {any} value
   * @returns {BaseHttp}
   */
  public setParams(value: any) {
    this.params = value;

    return this;
  }

  public setUrl(url: string) {
    this.url = url;
    return this;
  }

  public setMethod(method: Method) {
    this.method = method;
    return this;
  }

  /**
   * 设置请求的 data
   *
   * @param {any} value
   * @returns {BaseHttp}
   */
  public setData(value: any) {
    this.data = value;

    return this;
  }

  public setHost(value: string) {
    this.host = value;
    return this;
  }

  /**
   * 设置请求头
   *
   * @param {any} value
   * @returns {BaseHttp}
   */
  public setHeaders(value: object) {
    this.headers = value;

    return this;
  }

  /**
   * 发起请求
   *
   * @param method
   * @param url
   * @param data
   * @param params
   */
  // eslint-disable-next-line
  public http(method: string, url: string, data: any = null, params: any = null) {
    // 请求配置
    const config: Record<string, any> = {};

    config.host = this.host;

    // 请求类型
    config.method = method || this.method;
    // 请求 url

    const [parsedUrl, parsedData] = this.formatUrl(url, data || params);

    config.url = parsedUrl;

    this.isNeedSetData(config, 'headers');
    this.isNeedSetData(config, 'data', parsedData);
    this.isNeedSetData(config, 'params', parsedData);
    // 返回请求 Promise
    return this.httpInstance(config);
  }

  public request() {
    const config: Record<string, any> = {};
    // 请求类型
    config.method = this.method;
    // 请求 url
    config.url = this.url;

    if (this.host) {
      config.baseURL = this.host;
      config.url = this.url;
    }
    this.isNeedSetData(config, 'headers', this.headers);
    this.isNeedSetData(config, 'data', this.data);
    this.isNeedSetData(config, 'params', this.params);

    // 返回请求 Promise
    return this.httpInstance(config);
  }

  /**
   * 返回 axios 静态相关方法、属性
   *
   * @returns {Promise<AxiosStatic>}
   * @memberof BaseHttp
   */
  public getAxios(): AxiosStatic {
    return this.httpInstance;
  }

  public formatUrl(url: string, data: Record<string, any>) {
    const tokens = pathToRegExp.parse(url);
    const params = { ...data };
    const path = tokens.reduce((prev, item) => {
      if (typeof item === 'string') {
        return prev + item;
      } else {
        delete params[item.name];
        return prev + item.prefix + data[item.name];
      }
    }, '');
    return [path, params];
  }

  /**
   * GET 请求
   *
   * @param {string} url 请求地址
   * @param {any} params request query
   */
  public get(url: string, params?: any) {
    return this.http('get', url, null, params).then((res: any) => {
      return isObjectHasAttr(res);
    });
  }

  /**
   * POST 请求
   *
   * @param {string} url 请求 url
   * @param {any} data form data
   */
  public post(url: string, data?: any) {
    return this.http('post', url, data).then((res: any) => {
      return isObjectHasAttr(res);
    });
  }

  /**
   * PUT 请求
   *
   * @param {string} url 请求 url
   * @param {any} data form data
   */
  public put(url: string, data?: any) {
    return this.http('put', url, data).then((res: any) => {
      return isObjectHasAttr(res);
    });
  }

  /**
   * DELETE 请求
   *
   * @param {string} url 请求 url
   * @param {any} data form data
   * @param {any} params request query
   */
  public delete(url: string, data?: any, params?: any) {
    return this.http('delete', url, data, params).then(res => {
      return isObjectHasAttr(res);
    });
  }

  /**
   * 根据传入值 判断是否需要设置相关值
   *
   * @param {object} source 数据源
   * @param {string} propertyName
   * @param {any} value
   */
  private isNeedSetData(source: any, propertyName: string, value: any = null) {
    if (propertyName in (this as BaseHttp)) {
      const propertyData = (this as any)[propertyName];

      if (propertyData !== null) {
        source[propertyName] = propertyData;
      } else if (value !== null) {
        source[propertyName] = value;
      }
    }

    return source;
  }
}

export default BaseHttp;
