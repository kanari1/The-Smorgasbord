#!/usr/bin/env node

const cdk = require("@aws-cdk/core");
const { SmorgStack } =  require("../lib/cdk.js");

const app = new cdk.App();

new SmorgStack(app, 'SmorgStack');
