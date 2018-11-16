#!/bin/bash

read -p 'OTP: ' otp
NPM_CONFIG_OTP=$otp
lerna publish --npm-client=npm --force-publish=* --sign-git-commit --sign-git-tag --registry https://registry.npmjs.org/