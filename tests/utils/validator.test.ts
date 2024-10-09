import {
  comparePasswordHash,
  generatePasswordHash,
  validateCustomer,
} from "../../src/utils/validator";
import { CustomerProps } from "../../src/interfaces/customerProps";
import {
  BankError,
  ERROR_CODES,
  ERROR_MESSAGES,
} from "../../src/errors/bankError";
import bcrypt from "bcrypt";

describe("Validator Functions", () => {
  describe("validateCustomer", () => {
    test("should validate a customer with a valid name and initial deposit", () => {
      const validCustomer: CustomerProps = {
        name: "Sheldon",
        initialDeposit: 1500,
        password: "password123",
        role: "customer",
      };
      expect(() => validateCustomer(validCustomer)).not.toThrow();
    });

    test("should throw error for invalid name", () => {
      const invalidNameCustomer: CustomerProps = {
        name: "Sheldon123",
        initialDeposit: 1500,
        password: "password123",
        role: "customer",
      };
      expect(() => validateCustomer(invalidNameCustomer)).toThrow(
        new BankError(ERROR_CODES.INVALID_NAME, ERROR_MESSAGES.INVALID_NAME)
      );
    });

    test("should throw error for initial deposit less than 1000", () => {
      const invalidDepositCustomer: CustomerProps = {
        name: "Sheldon",
        initialDeposit: 500,
        password: "password123",
        role: "customer",
      };
      expect(() => validateCustomer(invalidDepositCustomer)).toThrow(
        new BankError(
          ERROR_CODES.INVALID_INITIAL_DEPOSIT,
          ERROR_MESSAGES.INVALID_INITIAL_DEPOSIT
        )
      );
    });
  });

  describe("generatePasswordHash", () => {
    test("should generate a valid bcrypt hash", () => {
      const password = "password123";
      const hash = generatePasswordHash(password);
      expect(bcrypt.compareSync(password, hash)).toBe(true);
    });
  });

  describe("comparePasswordHash", () => {
    test("should return true for matching password and hash", () => {
      const password = "password123";
      const hash = generatePasswordHash(password);
      expect(comparePasswordHash(password, hash)).toBe(true);
    });

    test("should return false for non-matching password and hash", () => {
      const password = "password123";
      const hash = generatePasswordHash(password);
      expect(comparePasswordHash("wrongpassword", hash)).toBe(false);
    });
  });
});
