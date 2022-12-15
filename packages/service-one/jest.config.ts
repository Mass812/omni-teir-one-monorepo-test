export default {
    displayName: 'service-one',
      testEnvironment: 'node',
      transform: {
        '^.+\\.[tj]s$': 'ts-jest',
      },
      moduleFileExtensions: ['ts', 'js', 'html'],
    }