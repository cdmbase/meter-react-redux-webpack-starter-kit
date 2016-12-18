# IDE. Front-end side.


## Overview
This part - front-end side of IDE that incapsulates all external services - Container Management, Workspace App, etc. This is Meteor.js application uses DB that shared with IOServer for sync containers and servers statuses.

## Installation and start
> You don't have to start with everything. MRRWS kit is perfect even for plain static pages. You can gracefully add any platform later. MRRWS kit mission is simple: **Help startups to deliver minimal valuable product asap with the state of the art real-time universal app stack with meteor**.


## Libraries

- [redux](http://rackt.github.io/redux/)
- [redux-observable](https://github.com/redux-observable/redux-observable)
- [react-intl](https://github.com/yahoo/react-intl)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [formatjs](http://formatjs.io/)
- [raven-js](https://github.com/getsentry/raven-js) Crash reporting client for [Sentry](https://getsentry.com).
- [rebass](https://github.com/jxnblk/rebass) Configurable React Stateless Functional UI Components
- [apollo](https://github.com/apollostack)
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

- Add config file - "***settings.json***" to development or prodction environment (./config/development or ./config/production).

```json
    {
      "public": {
        "sentryUrl": "https://********************@app.getsentry.com/***",
        "googleAnalyticsId": "UA-XXXXXXX-X",
        "io": "http://localhost:4000/manager",
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

- Create database - "***ide***" in MongoDB.

### Run Application
Before application run check *start* script in ***./app/package.json*** file.
```bash
cd app && npm start
```

### Start
```
cd app
meteor run --settings ../config/development/settings.json
```

>App url: http://localhost:3000               
>Graphiql url: http://localhost:3000/graphiql

### To Do

- Fix Graphql issues
- Add mobile

