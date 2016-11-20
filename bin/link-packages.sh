#!/usr/bin/env bash
#set -x


package_dir=$HOME/Documents/eclipse/workspace/phoneapps/third_party/meteor/packages/

#
# Global variables.
#

APP="../app"
CONFIG="../config"
BUILD="../build"
BIN="../bin"
TMP="/tmp"

lsdir=$(ls -1 $package_dir);
# remove old
delete=(old)
lsdir=( "${lsdir[@]/$delete}" )
delete=(public_packages)
lsdir=( "${lsdir[@]/$delete}" )

APP_PACKAGE_PATH=$APP/packages

if [ ! -d "$APP_PACKAGE_PATH" ]; then
    mkdir ${APP_PACKAGE_PATH}
fi

for pkg in $lsdir
do
if [ ! -d "$APP_PACKAGE_PATH/$pkg" ]; then
        echo "Linking $pkg"
        ln -s ${package_dir}/$pkg $APP_PACKAGE_PATH/$pkg
fi
done
