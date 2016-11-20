# Meteor  React Redux Webpack Starter Kit


> Starter kit for universal full–fledged React apps. One stack for browser, mobile, server.

> You don't have to start with everything. MRRWS kit is perfect even for plain static pages. You can gracefully add any platform later. MRRWS kit mission is simple: **Help startups to deliver minimal valuable product asap with the state of the art real-time universal app stack with meteor**.


## Libraries

- [redux](http://rackt.github.io/redux/)
- [redux-observable](https://github.com/redux-observable/redux-observable)
- [react-intl](https://github.com/yahoo/react-intl)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [formatjs](http://formatjs.io/)
- [raven-js](https://github.com/getsentry/raven-js) Crash reporting client for [Sentry](https://getsentry.com).
- [rebass](https://github.com/jxnblk/rebass) Configurable React Stateless Functional UI Components
- And much more. Explore the repository.


## Create App

```shell
git clone `url` NewApp
cd NewApp
npm install
``` 


### Installation

- Install NPM modules
```bash
cd app && npm install
```

- Add config file - "***settings.json***" to development or production environment (./config/development or ./config/production).
```json
    {
      "public": {
        "sentryUrl": "https://********************@app.getsentry.com/***",
        "googleAnalyticsId": "UA-XXXXXXX-X",
        "logLevel": "debug"
      },
      "private": {
        "oAuth": {
          "github": {
            "clientId": "********************",
            "secret": "****************************************"
          },
          "google": {
            "clientId": "",
            "secret": ""
          }
        }
      }
    }
```

### To Do

- Add mobile
