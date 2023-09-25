import { forEach, includes, round, intersection } from 'lodash';

export class UtilGlobal {

  public static parseFields(data: any, ignoreFields?: string[]) {
    forEach(data, (value, key) => {
      if (this.isJson(value) && (!ignoreFields || !includes(ignoreFields, key))) {
        data[key] = JSON.parse(value);
      }
    });
  }

  public static isJson(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public static reject(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      reject(data);
    });
  }

  public static resolve(data: any): Promise<any> {
    return new Promise((resolve) => {
      resolve(data);
    });
  }
}
