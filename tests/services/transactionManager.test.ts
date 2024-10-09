import { TransactionManager } from "../../src/services/transactionManager";
import { CustomerManager } from "../../src/services/customerManager";
import { BankError, ERROR_MESSAGES } from "../../src/errors/bankError";

describe("TransactionManager", () => {
  let transactionManager: TransactionManager;
  let customerManager: CustomerManager;

  const validCustomerProps = {
    name: "Sheldon",
    initialDeposit: 1000,
    password: "password123",
    role: "customer" as "customer",
  };

  const accountNumber1 = 1;
  const accountNumber2 = 2;

  beforeEach(() => {
    customerManager = new CustomerManager();
    transactionManager = new TransactionManager(customerManager);

    customerManager.createCustomer(validCustomerProps, accountNumber1);
    customerManager.createCustomer(validCustomerProps, accountNumber2);
  });

  test("should deposit money into the customer account", () => {
    const depositAmount = 500;
    transactionManager.deposit(accountNumber1, depositAmount);
    const customer = customerManager.getCustomer(accountNumber1);
    expect(customer?.getBalance()).toBe(1500);
  });

  test("should throw an error when depositing to a non-existing account", () => {
    expect(() => {
      transactionManager.deposit(999, 100);
    }).toThrow(BankError);
    expect(() => {
      transactionManager.deposit(999, 100);
    }).toThrow(ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
  });

  test("should withdraw money from the customer account", () => {
    const withdrawalAmount = 300;
    transactionManager.withdraw(
      accountNumber1,
      withdrawalAmount,
      "password123"
    );
    const customer = customerManager.getCustomer(accountNumber1);
    expect(customer?.getBalance()).toBe(700);
  });

  test("should throw an error for invalid password during withdrawal", () => {
    expect(() => {
      transactionManager.withdraw(accountNumber1, 100, "wrongPassword");
    }).toThrow(BankError);
    expect(() => {
      transactionManager.withdraw(accountNumber1, 100, "wrongPassword");
    }).toThrow(ERROR_MESSAGES.INVALID_PASSWORD);
  });

  test("should throw an error for insufficient balance during withdrawal", () => {
    expect(() => {
      transactionManager.withdraw(accountNumber1, 1500, "password123");
    }).toThrow(BankError);
    expect(() => {
      transactionManager.withdraw(accountNumber1, 1500, "password123");
    }).toThrow(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
  });

  test("should transfer money between customer accounts", () => {
    const transferAmount = 200;
    transactionManager.transfer(
      accountNumber1,
      accountNumber2,
      transferAmount,
      "password123"
    );

    const customer1 = customerManager.getCustomer(accountNumber1);
    const customer2 = customerManager.getCustomer(accountNumber2);

    expect(customer1?.getBalance()).toBe(800);
    expect(customer2?.getBalance()).toBe(1200);
  });

  test("should throw an error when transferring from a non-existing account", () => {
    expect(() => {
      transactionManager.transfer(999, accountNumber2, 100, "password123");
    }).toThrow(BankError);
    expect(() => {
      transactionManager.transfer(999, accountNumber2, 100, "password123");
    }).toThrow(ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
  });

  test("should throw an error when transferring to a non-existing account", () => {
    expect(() => {
      transactionManager.transfer(accountNumber1, 999, 100, "password123");
    }).toThrow(BankError);
    expect(() => {
      transactionManager.transfer(accountNumber1, 999, 100, "password123");
    }).toThrow(ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
  });

  test("should throw an error for invalid password during transfer", () => {
    expect(() => {
      transactionManager.transfer(
        accountNumber1,
        accountNumber2,
        100,
        "wrongPassword"
      );
    }).toThrow(BankError);
    expect(() => {
      transactionManager.transfer(
        accountNumber1,
        accountNumber2,
        100,
        "wrongPassword"
      );
    }).toThrow(ERROR_MESSAGES.INVALID_PASSWORD);
  });

  test("should throw an error for insufficient balance during transfer", () => {
    expect(() => {
      transactionManager.transfer(
        accountNumber1,
        accountNumber2,
        1200,
        "password123"
      );
    }).toThrow(BankError);
    expect(() => {
      transactionManager.transfer(
        accountNumber1,
        accountNumber2,
        1200,
        "password123"
      );
    }).toThrow(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
  });
});
