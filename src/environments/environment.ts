// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    AUTH_URL:          'https://ec2co-ecsel-1o4oi3seehm9q-2102525371.us-east-1.elb.amazonaws.com/login',
    ACCOUNTS_URL:      'https://3.84.26.113:8088/api/v0.1/accounts',
    CARD_TYPES_URL:    'https://3.84.26.113:8088/api/v0.1/accountTypes',
    CARDS_URL:         'https://3.84.26.113:8088/api/v0.1/cards',
    LOAN_TYPES_URL:    'https://3.84.26.113:8084/api/v0.1/LoanTypes',
    LOANS_URL:         'https://3.84.26.113:8084/api/v0.1/Loans',
    USERS_URL:         'https://3.84.26.113:8089',

    EMAILCONFIRM_LOAN: 'http://192.168.1.194:8090/api/v1/signup/loan',
    EMAILCONFIRM_ACCOUNT: 'http://192.168.1.194:8090/api/v1/signup/account',
    EMAILCONFIRM_CARD: 'http://192.168.1.194:8090/api/v1/signup/card',
    EMAILCONFIRM_USER: 'http://192.168.1.194:8090/api/v1/signup/user'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
