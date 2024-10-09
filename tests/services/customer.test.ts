import { CustomerProps } from "../../src/interfaces/customerProps";
import { BankError, ERROR_MESSAGES } from "../../src/errors/bankError";
import { Customer } from "../../src/services/customer";

describe("Customer", () => {
  let customer: Customer;
  const accountNumber = 1;

  const validCustomerProps: CustomerProps = {
    name: "Sheldon",
    initialDeposit: 1500,
    password: "password123",
    role: "customer",
  };

  beforeEach(() => {
    customer = new Customer(validCustomerProps, accountNumber);
  });

  describe("constructor", () => {
    it("should create a customer with valid props", () => {
      expect(customer).toBeDefined();
      expect(customer.getAccountNumber()).toBe(accountNumber);
      expect(customer.getBalance()).toBe(1500);
      expect(customer.getRole()).toBe("customer");
    });

    it("should throw an error if customer props are invalid", () => {
      const invalidProps: CustomerProps = {
        name: "",
        initialDeposit: -100,
        password: "short",
        role: "customer",
      };
      expect(() => new Customer(invalidProps, 2)).toThrow(BankError);
    });
  });

  describe("deposit", () => {
    it("should increase the balance when depositing a valid amount", () => {
      customer.deposit(500);
      expect(customer.getBalance()).toBe(2000);
    });

    it("should throw an error when depositing a negative amount", () => {
      expect(() => customer.deposit(-100)).toThrow(BankError);
      expect(() => customer.deposit(-100)).toThrow(
        ERROR_MESSAGES.INVALID_DEPOSIT
      );
    });

    it("should throw an error when depositing zero", () => {
      expect(() => customer.deposit(0)).toThrow(BankError);
      expect(() => customer.deposit(0)).toThrow(ERROR_MESSAGES.INVALID_DEPOSIT);
    });
  });

  describe("withdraw", () => {
    it("should decrease the balance when withdrawing a valid amount", () => {
      customer.withdraw(500);
      expect(customer.getBalance()).toBe(1000);
    });

    it("should throw an error when withdrawing more than the balance", () => {
      expect(() => customer.withdraw(2000)).toThrow(BankError);
      expect(() => customer.withdraw(2000)).toThrow(
        ERROR_MESSAGES.INSUFFICIENT_BALANCE
      );
    });

    it("should throw an error when withdrawing a negative amount", () => {
      expect(() => customer.withdraw(-100)).toThrow(BankError);
      expect(() => customer.withdraw(-100)).toThrow(
        ERROR_MESSAGES.INVALID_WITHDRAWAL
      );
    });

    it("should throw an error when withdrawing zero", () => {
      expect(() => customer.withdraw(0)).toThrow(BankError);
      expect(() => customer.withdraw(0)).toThrow(
        ERROR_MESSAGES.INVALID_WITHDRAWAL
      );
    });
  });

  describe("getBalance", () => {
    it("should return the current balance", () => {
      expect(customer.getBalance()).toBe(1500);
    });
  });

  describe("validatePassword", () => {
    it("should return true for correct password", () => {
      expect(customer.validatePassword("password123")).toBe(true);
    });

    it("should return false for incorrect password", () => {
      expect(customer.validatePassword("wrongPassword")).toBe(false);
    });
  });

  describe("getVersion", () => {
    it("should return the current version of the customer", () => {
      expect(customer.getVersion()).toBe(0);
      customer.deposit(100);
      expect(customer.getVersion()).toBe(1);
    });
  });
});
