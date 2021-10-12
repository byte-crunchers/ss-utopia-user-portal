import { Pipe, PipeTransform } from '@angular/core';
/*
 * show only last 4 digits of card number
*/
@Pipe({ name: 'last4' })
export class Last4Pipe implements PipeTransform {
    transform(value: number): string {
        let c = value.toString();
        return c.substring(c.length - 4, c.length);
    }
}