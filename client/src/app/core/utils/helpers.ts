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
      '-webkit-animation-delay': '',
      'z-index': 0
    };
    
    style['top'] = 30 * (count + 1) + 'px';
    style['margin-top'] = -26 * (count + 1) + 'px';
    style['animation-delay'] = 0.1 + count / 9 + 's';
    style['-webkit-animation-delay'] = 0.1 + count / 9 + 's';
    style['z-index'] = 1;
    return style;
  }

  static removeNulls(obj: any): any {
    let index = 0;
    let deleted = 0;
    delete obj.__v;
    for (const key in obj) {
      if (key) {
        index++;
        if (obj[key] === null || obj[key] === undefined || obj[key] instanceof Function || (obj[key] instanceof Array && obj[key].length === 0)) {
          delete obj[key];
          deleted++;
        } else if (obj[key] instanceof Object && !(obj[key] instanceof Array) && !(obj[key] instanceof Date)) {
          const result = this.removeNulls(obj[key]);
          result === null ? delete obj[key] : obj[key] = result;
        }
      }
    }

    if (index === deleted) {
      return null;
    }
    return obj;
  }

  static appendDataToForm(data: { [key in string]: any }, photos?: File[] | any, video?: File, files?: { name: string, file: any }[]): FormData {
    const formData = new FormData();

    if (data) {
      const dataKeys = Object.keys(data);
      dataKeys?.forEach(item => {
        formData.append(item, data[item]);
      });
    }
   
    if (photos && photos instanceof Array && photos.length > 0) {
      const photosKey = Object.keys(photos).map((key: any) => {
        return (typeof (photos[key]) === 'object') ? photos[key] : null;
      });
      photosKey.forEach((item, key) => {
        formData.append('photo-' + key, item);
      });
    } else if (photos && photos.name) {
      formData.append('photo', photos);
    }

    if (video instanceof File && video.name) {
      formData.append('video', video);
    }

    files?.forEach(data => {
      if (data.file instanceof File && data?.name) {
        formData.append(data?.name, data.file);
      }
    });
    return formData;
  }
  
  static getSaveUrl(value: string) {
    try {
      return value.replace(/\(/g, '%5B').replace(/\)/g, '%5D').replace(/ /g, '%20');
    } catch (e) {
      return value;
    }
  }
}


