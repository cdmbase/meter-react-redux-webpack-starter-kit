#!/usr/bin/env bash

#
# Global variables.
#

APP="../app"
CONFIG="../config"
BUILD="../build"
BIN="../bin"
TMP="/tmp"

APP_CLIENT_PATH=$APP/client
APP_CLIENT_COLLECTIONS=$APP_CLIENT_PATH/collections
APP_CLIENT_COMPONENTS=$APP_CLIENT_PATH/components
APP_CLIENT_LIB=$APP_CLIENT_PATH/lib
APP_CLIENT_STARTUP=$APP_CLIENT_PATH/startup
APP_CLIENT_STYLES=$APP_CLIENT_PATH/styles
APP_CLIENT_VIEWS=$APP_CLIENT_PATH/views

APP_LIB=$APP/lib
APP_PUBLIC=$APP/public
APP_PRIVATE=$APP/private

APP_SERVER_PATH=$APP/server
APP_SERVER_COLLECTIONS=$APP_SERVER_PATH/collections
APP_SERVER_LIB=$APP_SERVER_PATH/lib
APP_SERVER_METHODS=$APP_SERVER_PATH/methods
APP_SERVER_PUBLISH=$APP_SERVER_PATH/publish
APP_SERVER_STARTUP=$APP_SERVER_PATH/startup

# Client Directories
if [ ! -d "$APP_CLIENT_COLLECTIONS" ]; then
    mkdir $APP_CLIENT_COLLECTIONS
fi
if [ ! -d "$APP_CLIENT_COMPONENTS" ]; then
    mkdir $APP_CLIENT_COMPONENTS
fi
if [ ! -d "$APP_CLIENT_LIB" ]; then
    mkdir $APP_CLIENT_LIB
fi
if [ ! -d "$APP_CLIENT_STARTUP" ]; then
    mkdir $APP_CLIENT_STARTUP
fi
if [ ! -d "$APP_CLIENT_STYLES" ]; then
    mkdir $APP_CLIENT_STYLES
fi
if [ ! -d "$APP_CLIENT_VIEWS" ]; then
    mkdir $APP_CLIENT_VIEWS
fi

# Main Directories
if [ ! -d "$APP_LIB" ]; then
    mkdir $APP_LIB
fi
if [ ! -d "$APP_PUBLIC" ]; then
    mkdir $APP_PUBLIC
fi
if [ ! -d "$APP_PRIVATE" ]; then
    mkdir $APP_PRIVATE
fi

# Server Directories
if [ ! -d "$APP_SERVER_COLLECTIONS" ]; then
    mkdir $APP_SERVER_COLLECTIONS
fi
if [ ! -d "$APP_SERVER_LIB" ]; then
    mkdir $APP_SERVER_LIB
fi
if [ ! -d "$APP_SERVER_METHODS" ]; then
    mkdir $APP_SERVER_METHODS
fi
if [ ! -d "$APP_SERVER_PUBLISH" ]; then
    mkdir $APP_SERVER_PUBLISH
fi
if [ ! -d "$APP_SERVER_STARTUP" ]; then
    mkdir $APP_SERVER_STARTUP
fi


