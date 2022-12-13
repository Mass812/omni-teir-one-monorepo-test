'use strict';
import {serviceTwo} from '@ts-omni/service-two';

function serviceOne() {
    // console log color pink
    console.log('\x1b[35m%s\x1b[0m', "Hello from serviceOne file");
    console.log('\x1b[34m%s\x1b[0m', serviceTwo());
    
    return "Hello from serviceOne";
}

serviceOne();
