
# BankApp

BankApp is a simple banking application that allows users to create accounts, deposit and withdraw funds, and transfer money between accounts. The application also supports role-based access control for customers and managers.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 12.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/BankApp.git
   cd BankApp
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   This will install all necessary dependencies, including `bcrypt` and any other required packages.

## Running the Tests

To run the tests, use the following command:

```bash
npx jest
```

This will run all the test files located in the `tests` directory and generate a code coverage report.

## Generating Code Coverage Report

To generate a code coverage report in HTML format, use the following command:

```bash
npx jest --coverage
```

The coverage report will be generated in the `coverage` directory. Open the `index.html` file in a web browser to view the detailed coverage report.

## Design Choices

1. **Modular Structure**  
   The application is divided into several modules, each responsible for a specific aspect of the application. This modular structure makes the codebase more maintainable and scalable.
   - **Interfaces**: Contains TypeScript interfaces that define the shape of data objects.
   - **Errors**: Contains custom error classes to handle different error scenarios.
   - **Utils**: Contains utility functions for common tasks like validation and password hashing.
   - **Services**: Contains service classes that encapsulate the business logic of the application.

2. **Singleton Pattern**  
   The `Bank` class is implemented as a singleton to ensure that there is only one instance of the bank throughout the application. This is useful for maintaining a consistent state across the application.

3. **Role-Based Access Control**  
   The application supports role-based access control, allowing different actions based on the user's role (e.g., customer or manager). This is implemented in the `Customer` class and enforced in various service methods.

4. **Lock Management**  
   The `LockManager` class is used to handle concurrent modifications to customer accounts. This ensures that operations like deposits, withdrawals, and transfers are atomic and consistent.

5. **Error Handling**  
   Custom error classes are used to handle different error scenarios. This makes the error handling more robust and provides meaningful error messages to the users.

6. **Password Management**  
   Passwords are hashed using `bcrypt` to ensure that they are stored securely. The `validatePassword` method in the `Customer` class is used to compare the hashed password with the plain text password provided by the user.

## Project Configuration

### Jest Configuration

The Jest configuration is defined in the `jest.config.js` file:

```javascript
module.exports = {
  preset: 'ts-jest',  // Use ts-jest preset for TypeScript support
  testEnvironment: 'node',  // Set the test environment to Node.js
  roots: ['<rootDir>/src', '<rootDir>/tests'],  // Define the root directories for your source and test files
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',  // Match test files in __tests__ directories
    '**/?(*.)+(spec|test).+(ts|tsx|js)'  // Match test files with .spec or .test in their names
  ],
  transform: {
    '^.+\.ts$': 'ts-jest',  // Use ts-jest to transform TypeScript files
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],  // Recognize these file extensions
  collectCoverage: true,  // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{ts,js}',  // Collect coverage from all .ts and .js files in src
    '!src/**/*.d.ts',  // Exclude TypeScript declaration files
  ],
  coverageDirectory: 'coverage',  // Output coverage reports to the coverage directory
  coverageReporters: ['text', 'lcov', 'html'],  // Use text, lcov, and html reporters for coverage
};
```

