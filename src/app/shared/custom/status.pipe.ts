import { Pipe, PipeTransform } from '@angular/core';
/*
 * convert payment status code to string
*/
@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
    transform(value: number): string {
        switch(value) {
            case 0:
                return "Accepted";
            case 1:
                return "Accepted";
            case -1:
                return "Insufficient Funds";
            case -2:
                return "Inactive Dependent";
            case -5:
                return "Invalid Account Type";
            case -6:
                return "Payment Too Large";
            default:
                return "?";
        }
    }
}