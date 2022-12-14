'use strict';


export const serviceTwo =(): string => {
    return "Hello from serviceTwo file";
}


export const greetUser =(name: string): string => {
    return `Hello ${name} from serviceTwo file`;
}