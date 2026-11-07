#!/bin/sh
# Bring /opt/javarouters/docs-site to the latest commit of origin/deploy.
# Installed on the VPS as /opt/javarouters/docs-sync.sh and run by javarouters-docs-sync.timer.
set -eu

DIR=/opt/javarouters/docs-site

git -C "$DIR" fetch --quiet --depth 1 origin deploy
git -C "$DIR" reset --quiet --hard FETCH_HEAD
git -C "$DIR" clean --quiet -fdx
