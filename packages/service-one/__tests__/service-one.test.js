'use strict';

import {serviceOne} from '../lib/service-one';
const assert = require('assert').strict;

assert.strictEqual(serviceOne(), 'Hello from serviceOne');
console.info("serviceOne tests passed");
