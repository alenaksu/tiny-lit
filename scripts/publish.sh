#!/bin/bash

read -p 'OTP: ' otp
NPM_CONFIG_OTP=$otp
lerna publish --sign-git-commit --sign-git-tag --registry https://registry.npmjs.org/