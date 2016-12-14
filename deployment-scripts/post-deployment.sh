#!/bin/bash

token=$1

if [ "$TRAVIS_BRANCH" = "master" ]; then
  body='{
    "request": {
      "branch":"master"
    }}'
else
  body='{
    "request": {
      "branch":"dev"
    }}'
fi


curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token $token" \
  -d "$body" \
  https://api.travis-ci.org/repo/amos-ws16%2Famos-ws16-arrowjs-server/requests
