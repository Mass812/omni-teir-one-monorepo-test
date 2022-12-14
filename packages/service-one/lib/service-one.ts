'use strict';
import {serviceTwo, greetUser} from '../../service-two/lib/service-two';

export function serviceOne() {
    // console log color pink
    console.log('\x1b[35m%s\x1b[0m', greetUser('John'));
    console.log('\x1b[34m%s\x1b[0m', serviceTwo());
    
    return "Hello from serviceOne";
}

serviceOne();
