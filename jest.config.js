module.exports = {
    preset: 'ts-jest',  
    testEnvironment: 'node',  
    roots: ['<rootDir>/tests'], 
    testMatch: [
      '**/?(*.)+(test).[jt]s?(x)', 
    ],
    transform: {
      '^.+\\.ts$': 'ts-jest',  
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],  
    collectCoverage: true,  
    collectCoverageFrom: [
      'src/**/*.{ts,js}',  
      '!src/**/*.d.ts',  
    ],
    coverageDirectory: 'coverage',  
    coverageReporters: ['text', 'lcov'],  
  };
