import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ 
    name: 'truncateText',
    standalone: true
})
export class TruncateTextPipe implements PipeTransform {
    transform(text: any, splice: number): string {
        if (typeof text === 'string' || text instanceof String) {
        if (text.length > splice) {
            text = text.slice(0, splice);
            const lastLetter = text[text.length - 1];
            if (lastLetter === ' ') {
            text = text.slice(0, text.length - 1) + '...';
            } else if (lastLetter !== '.') {
            text = text + '...';
            }
        }
        }
        return text;
    }
}