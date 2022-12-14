'use strict';

import { greetUser, serviceTwo } from "@ts-omni/service-two";


 export default function serviceOne() {
    // console log color pink
    console.log('\x1b[35m%s\x1b[0m', greetUser('John'));
    console.log('\x1b[34m%s\x1b[0m', serviceTwo());
    
    return "Hello from serviceOne";
}

serviceOne();
