#!/bin/bash

work_path=$(pwd)

#  npm version major | minor | patch | premajor | preminor | prepatch | prerelease
function upVersion(){
  echo $1
}

function npmIsLogin() {
    npm whoami
}

function publish() {
  for file in `ls $1`
  do
    cd $1/$file
    yarn && yarn build && rm -rf ./node_modules
    upVersion $2
  done
}

if npmIsLogin; then
  publish $work_path/packages $2
else
  npm login
  publish $work_path/packages
fi
