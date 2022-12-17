'use strict';

export const serviceTwo = (): string => {
  const newLocal = 'Hello from serviceTwo file';
  return newLocal;
};

export const greetUser = (name: string): string => {
  return `Hello ${name} from serviceTwo files
    `;
};
