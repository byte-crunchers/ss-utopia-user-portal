import { Pipe, PipeTransform } from '@angular/core';
/*
 * multiply monthly interest rate by 12 to get annual APR
*/
@Pipe({ name: 'apr' })
export class AprPipe implements PipeTransform {
    transform(value: number): number {
        return value * 12;
    }
}