// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // AUTH_URL:       'https://184.73.38.151:8443/login',
    // USERS_URL:      'https://184.73.38.151:8443/users',
    // CARD_TYPES_URL: 'https://184.73.38.151:8443/api/v0.1/CardTypes',
    // CARDS_URL:      'https://184.73.38.151:8443/cards',
    // LOAN_TYPES_URL: 'https://184.73.38.151:8443/api/v0.1/LoanTypes',
    // LOANS_URL:      'https://184.73.38.151:8443/loans',

    AUTH_URL:       'http://ss-alb-1047376244.us-east-1.elb.amazonaws.com:53440/login',
    USERS_URL:      'http://ss-alb-1047376244.us-east-1.elb.amazonaws.com:8443/users',
    CARD_TYPES_URL: 'http://ss-alb-1047376244.us-east-1.elb.amazonaws.com:8083/api/v0.1/CardTypes',
    CARDS_URL:      'http://ss-alb-1047376244.us-east-1.elb.amazonaws.com:8083/api/v0.1/CardTypes',
    LOAN_TYPES_URL: 'http://ss-alb-1047376244.us-east-1.elb.amazonaws.com:8084/api/v0.1/LoanTypes',
    LOANS_URL:      'http://ss-alb-1047376244.us-east-1.elb.amazonaws.com:8084/api/v0.1/LoanTypes',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
