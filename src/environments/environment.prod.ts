export const environment = {
  production: false
};

export let APIURL = '';

switch (window.location.hostname) {
    // this is the deployed angular application
    case 'vinylrevival.herokuapp.com':
    console.log(window.location.hostname);
    // this is the full url of your deployed API
        APIURL = 'https://vinylrevival-server.herokuapp.com';
    break;
    default:
    console.log(window.location.hostname);
    // this is the local host name of your API
        APIURL = 'http://localhost:3005';
    break;
}
