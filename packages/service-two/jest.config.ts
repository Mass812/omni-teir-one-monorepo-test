export default {
    displayName: 'service-two',
      testEnvironment: 'node',
      transform: {
        '^.+\\.[tj]s$': 'ts-jest',
      },
      moduleFileExtensions: ['ts', 'js', 'html'],
    }