import { CustomerManager } from "../../src/services/customerManager";
import { CustomerProps } from "../../src/interfaces/customerProps";
import { BankError, ERROR_MESSAGES } from "../../src/errors/bankError";

describe("CustomerManager", () => {
  let customerManager: CustomerManager;
  const validCustomerProps: CustomerProps = {
    name: "Sheldon",
    initialDeposit: 1000,
    password: "securePassword",
    role: "customer",
  };
  const accountNumber = 1;

  beforeEach(() => {
    customerManager = new CustomerManager();
    customerManager.createCustomer(validCustomerProps, accountNumber);
  });

  describe("createCustomer", () => {
    it("should create a customer and store it in the manager", () => {
      const newAccountNumber = 2;
      const newCustomerProps: CustomerProps = {
        name: "Sheldon",
        initialDeposit: 2000,
        password: "anotherSecurePassword",
        role: "customer",
      };

      customerManager.createCustomer(newCustomerProps, newAccountNumber);
      const customer = customerManager.getCustomer(newAccountNumber);
      expect(customer).toBeDefined();
      expect(customer?.getBalance()).toBe(2000);
    });

    it("should throw an error if trying to create a customer with an existing account number", () => {
      expect(() => {
        customerManager.createCustomer(validCustomerProps, accountNumber);
      }).toThrow();
    });
  });

  describe("getCustomer", () => {
    it("should return the correct customer for a valid account number", () => {
      const customer = customerManager.getCustomer(accountNumber);
      expect(customer).toBeDefined();
      expect(customer?.getAccountNumber()).toBe(accountNumber);
    });

    it("should return undefined for an invalid account number", () => {
      const customer = customerManager.getCustomer(999);
      expect(customer).toBeUndefined();
    });
  });

  describe("getCustomerBalance", () => {
    it("should return the balance for a valid account number and correct password", () => {
      const balance = customerManager.getCustomerBalance(
        accountNumber,
        "securePassword"
      );
      expect(balance).toBe(1000);
    });

    it("should throw an error for an invalid account number", () => {
      expect(() => {
        customerManager.getCustomerBalance(999, "securePassword");
      }).toThrow(BankError);
      expect(() => {
        customerManager.getCustomerBalance(999, "securePassword");
      }).toThrow(ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
    });

    it("should throw an error for an incorrect password", () => {
      expect(() => {
        customerManager.getCustomerBalance(accountNumber, "wrongPassword");
      }).toThrow(BankError);
      expect(() => {
        customerManager.getCustomerBalance(accountNumber, "wrongPassword");
      }).toThrow(ERROR_MESSAGES.INVALID_PASSWORD);
    });
  });

  describe("getTotalBalance", () => {
    it("should return the total balance of all customers", () => {
      const newAccountNumber = 2;
      const newCustomerProps: CustomerProps = {
        name: "Amy",
        initialDeposit: 1000,
        password: "amyPassword",
        role: "customer",
      };
      customerManager.createCustomer(newCustomerProps, newAccountNumber);
      const totalBalance = customerManager.getTotalBalance();
      expect(totalBalance).toBe(2000);
    });

    it("should return 0 if no customers exist", () => {
      const newManager = new CustomerManager();
      const totalBalance = newManager.getTotalBalance();
      expect(totalBalance).toBe(0);
    });
  });
});
