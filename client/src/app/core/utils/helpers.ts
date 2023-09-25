import { HttpParams } from '@angular/common/http';
import { IFlagStyle } from '../../models/utils.model';

export class Helpers {

  static isJson(str: any): any {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static convertToStringify(obj: any): any {
    try {
      delete obj.__v;
      for (const key in obj) {
        if (obj[key] instanceof Object || obj[key] instanceof File) {
          obj[key] = JSON.stringify(obj[key]);
        }
      }
      return obj;
    } catch (err) {
      return obj;
    }
  }

  static appendDataToParams(data: { [key in string]: any }): HttpParams {
    let params = new HttpParams();
    if (data) {
      for (const key in data) {
        if (key) {
          params = params.append(key, data[key]);
        }
      }
    }
    return params;
  }

  static getLangSelectorStyles(count: number): IFlagStyle {
    const style = { 
      top: '', 
      padding: 0, 
      'margin-top': '', 
      'animation-delay': '', 
      '-webkit-animation-delay': ''
    };
    
    style['top'] = 30 * (count + 1) + 'px';
    style['margin-top'] = -26 * (count + 1) + 'px';
    style['animation-delay'] = 0.1 + count / 9 + 's';
    style['-webkit-animation-delay'] = 0.1 + count / 9 + 's';
    return style;
  }
}
