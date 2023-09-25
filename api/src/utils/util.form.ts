import formidable from 'formidable';
import { UtilGlobal } from './util.global';
import { IFiles } from '../models/file.model';

export interface IIncomingFormData {
  data: any;
  files: IFiles;
  message?: string;
  success: true;
}

export class UtilForm {

  public static retrieveDataAndFile(req: any, ...ignoreFields: string[]): Promise<IIncomingFormData> {
    return new Promise((resolve, reject) => {
      let data, file;
      
      const form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        data = fields;
        UtilGlobal.parseFields(data, ignoreFields);
        file = Object.keys(files).length === 0 ? null : files;
      });

      form.on('error', (err) => {
        reject({ success: false, message: err });
      });

      form.on('end', () => {
        resolve({
          data,
          files: file,
          success: true
        });
      });
    });
  }
}
