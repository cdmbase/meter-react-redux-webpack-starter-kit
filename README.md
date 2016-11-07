# IDE. Front-end side.


## Overview
This part - front-end side of IDE that incapsulates all external services - Container Management, Workspace App, etc. This is Meteor.js application uses DB that shared with IOServer for sync containers and servers statuses.

## Installation and start

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