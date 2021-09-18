// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    BASE_PAI_URL: 'https://184.73.38.151:8443',
    // BASE_PAI_URL: 'https://localhost:8090',
    CARDS_GET_URL: '/utopia/cards',
    CARDS_POST_URL: '/utopia/cards',
    LOANS_GET_URL: '/utopia/loans',
    LOANS_POST_URL: '/utopia/loans',
    LOGIN_URL: 'https://184.73.38.151:8443/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
