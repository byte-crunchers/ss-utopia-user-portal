// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    AUTH_URL:       'https://localhost:8181/login',
    ACCOUNTS_URL:   'https://192.168.1.194:8088/api/v0.1/accounts',
    CARD_TYPES_URL: 'https://192.168.1.194:8088/api/v0.1/accountTypes',
    CARDS_URL:      'https://192.168.1.194:8088/api/v0.1/cards',
    LOAN_TYPES_URL: 'https://192.168.1.194:8084/api/v0.1/LoanTypes',
    LOANS_URL:      'https://192.168.1.194:8084/api/v0.1/Loans',


    // AUTH_URL:       'https://localhost:8443/login',
    // ACCOUNTS_URL:   'https://localhost:8088/api/v0.1/accounts',
    // CARD_TYPES_URL: 'https://localhost:8088/api/v0.1/accountTypes',
    // CARDS_URL:      'https://localhost:8088/api/v0.1/cards',
    // LOAN_TYPES_URL: 'https://localhost:8084/api/v0.1/LoanTypes',
    // LOANS_URL:      'https://localhost:8084/api/v0.1/Loans',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
