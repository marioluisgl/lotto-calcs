import { File } from 'formidable';

export interface IFileData {
  type: 'img' | 'video' | string;
  property: string;
  value: any;
}

export interface IFiles {
  [key: string]: File;
}
