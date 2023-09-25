import {Pipe, PipeTransform} from '@angular/core';
import { AVATARS } from '../core/config/global.config';

@Pipe({
  name: 'imageUser',
  standalone: true
})
export class ImageUserPipe implements PipeTransform {
  constructor() {}
  transform(value?: 'MALE' | 'FEMALE' | any) {
    return value === 'MALE' ? AVATARS.MAN: AVATARS.WOMAN;
  }
}

@Pipe({
  name: 'imageLogo',
  standalone: true
})
export class ImageLogoPipe implements PipeTransform {
  constructor() {}
  transform(type: 'MEGAMILLION' | 'POWERBALL' | any ): string {
    let url!: string;
    switch (type) {
      case 'MEGAMILLION':
        url = 'assets/images/megamillions.png';
        break;
      case 'POWERBALL':
        url = 'assets/images/powerball.png';
        break;
    }
    return url;
  }
}

