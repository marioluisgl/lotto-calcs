import {trigger, query, style, animate, transition} from '@angular/animations';

export const globalAnimation = [
  trigger('enterOpacity', [
    transition(':enter', [
      query(':self', style({opacity: 0})),
      query(':self', animate(500, style({opacity: 1}))),
    ]),
    transition(':leave', [
      query(':self', style({opacity: 1})),
      query(':self', animate(0, style({opacity: 0}))),
    ])
  ]),
];