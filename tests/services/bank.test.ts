import { CustomerProps } from "../../src/interfaces/customerProps";
import { BankError, ERROR_MESSAGES } from "../../src/errors/bankError";
import { Bank } from "../../src/services/bank";

describe("Bank", () => {
  let bank: Bank;
  let validCustomerProps: CustomerProps;

  const createCustomerProps = (
    name: string,
    initialDeposit: number,
    password: string,
    role: "customer" | "manager"
  ): CustomerProps => ({
    name,
    initialDeposit,
    password,
    role,
  });

  beforeEach(() => {
    Bank.resetInstance();
    bank = Bank.getInstance();
    validCustomerProps = createCustomerProps(
      "Sheldon",
      1000,
      "password123",
      "customer"
    );
  });

  test("should create an account and return an account number", () => {
    const accountNumber = bank.createAccount(validCustomerProps);
    expect(accountNumber).toBe(1);
  });

  test("should increment account numbers for new accounts", () => {
    const firstAccountNumber = bank.createAccount(validCustomerProps);
    const secondAccountNumber = bank.createAccount(validCustomerProps);
    expect(secondAccountNumber).toBe(firstAccountNumber + 1);
  });

  test("should deposit money into an account", () => {
    const accountNumber = bank.createAccount(validCustomerProps);
    bank.deposit(accountNumber, 500);
    expect(
      bank.getCustomerBalance(accountNumber, validCustomerProps.password)
    ).toBe(1500);
  });

  test("should throw an error when depositing a negative amount", () => {
    const accountNumber = bank.createAccount(validCustomerProps);
    expect(() => bank.deposit(accountNumber, -500)).toThrow(BankError);
    expect(() => bank.deposit(accountNumber, -500)).toThrow(
      ERROR_MESSAGES.INVALID_DEPOSIT
    );
  });

  test("should withdraw money from an account", () => {
    const accountNumber = bank.createAccount(validCustomerProps);
    bank.withdraw(accountNumber, 200, validCustomerProps.password);
    expect(
      bank.getCustomerBalance(accountNumber, validCustomerProps.password)
    ).toBe(800);
  });

  test("should throw an error for insufficient balance on withdrawal", () => {
    const accountNumber = bank.createAccount(validCustomerProps);
    expect(() =>
      bank.withdraw(accountNumber, 2000, validCustomerProps.password)
    ).toThrow(BankError);
    expect(() =>
      bank.withdraw(accountNumber, 2000, validCustomerProps.password)
    ).toThrow(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
  });

  test("should throw an error when withdrawing a negative amount", () => {
    const accountNumber = bank.createAccount(validCustomerProps);
    expect(() =>
      bank.withdraw(accountNumber, -200, validCustomerProps.password)
    ).toThrow(BankError);
    expect(() =>
      bank.withdraw(accountNumber, -200, validCustomerProps.password)
    ).toThrow(ERROR_MESSAGES.INVALID_WITHDRAWAL);
  });

  test("should allow transfer between accounts", () => {
    const senderAccount = bank.createAccount(validCustomerProps);
    const recipientProps = createCustomerProps(
      "Amy",
      1000,
      "password123",
      "customer"
    );
    const recipientAccount = bank.createAccount(recipientProps);

    bank.transfer(
      senderAccount,
      recipientAccount,
      500,
      validCustomerProps.password
    );

    expect(
      bank.getCustomerBalance(senderAccount, validCustomerProps.password)
    ).toBe(500);
    expect(
      bank.getCustomerBalance(recipientAccount, recipientProps.password)
    ).toBe(1500);
  });

  test("should throw an error when transferring a negative amount", () => {
    const senderAccount = bank.createAccount(validCustomerProps);
    const recipientProps = createCustomerProps(
      "Amy",
      1000,
      "password123",
      "customer"
    );
    const recipientAccount = bank.createAccount(recipientProps);

    expect(() =>
      bank.transfer(
        senderAccount,
        recipientAccount,
        -500,
        validCustomerProps.password
      )
    ).toThrow(BankError);
    expect(() =>
      bank.transfer(
        senderAccount,
        recipientAccount,
        -500,
        validCustomerProps.password
      )
    ).toThrow(ERROR_MESSAGES.INVALID_WITHDRAWAL);
  });

  test("should throw an error when transferring from an account with insufficient balance", () => {
    const senderAccount = bank.createAccount(validCustomerProps);
    const recipientProps = createCustomerProps(
      "Amy",
      1000,
      "password123",
      "customer"
    );
    const recipientAccount = bank.createAccount(recipientProps);

    expect(() =>
      bank.transfer(
        senderAccount,
        recipientAccount,
        2000,
        validCustomerProps.password
      )
    ).toThrow(BankError);
    expect(() =>
      bank.transfer(
        senderAccount,
        recipientAccount,
        2000,
        validCustomerProps.password
      )
    ).toThrow(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
  });

  test("should throw an error when transferring to a non-existent account", () => {
    const senderAccount = bank.createAccount(validCustomerProps);

    expect(() =>
      bank.transfer(senderAccount, 9999, 500, validCustomerProps.password)
    ).toThrow(BankError);
    expect(() =>
      bank.transfer(senderAccount, 9999, 500, validCustomerProps.password)
    ).toThrow(ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
  });

  test("should throw an error when withdrawing with an incorrect password", () => {
    const accountNumber = bank.createAccount(validCustomerProps);
    expect(() => bank.withdraw(accountNumber, 200, "wrongpassword")).toThrow(
      BankError
    );
    expect(() => bank.withdraw(accountNumber, 200, "wrongpassword")).toThrow(
      ERROR_MESSAGES.INVALID_PASSWORD
    );
  });

  test("should throw an error when getting balance with an incorrect password", () => {
    const accountNumber = bank.createAccount(validCustomerProps);
    expect(() =>
      bank.getCustomerBalance(accountNumber, "wrongpassword")
    ).toThrow(BankError);
    expect(() =>
      bank.getCustomerBalance(accountNumber, "wrongpassword")
    ).toThrow(ERROR_MESSAGES.INVALID_PASSWORD);
  });

  test("should throw an error for unauthorized access to total balance", () => {
    bank.createAccount(validCustomerProps);
    expect(() =>
      bank.getTotalBalance({ getRole: () => "customer" } as any)
    ).toThrow(BankError);
    expect(() =>
      bank.getTotalBalance({ getRole: () => "customer" } as any)
    ).toThrow(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
  });

  test("should allow manager to access total balance", () => {
    const managerProps = createCustomerProps(
      "Manager",
      5000,
      "managerpass",
      "manager"
    );
    bank.createAccount(managerProps);
    const customerAccountNumber = bank.createAccount(validCustomerProps);
    bank.deposit(customerAccountNumber, 1000);

    expect(bank.getTotalBalance({ getRole: () => "manager" } as any)).toBe(
      7000
    );
  });

  test("should create multiple accounts and ensure unique account numbers", () => {
    const accountNumbers = new Set<number>();
    for (let i = 0; i < 10; i++) {
      const accountNumber = bank.createAccount(validCustomerProps);
      expect(accountNumbers.has(accountNumber)).toBe(false);
      accountNumbers.add(accountNumber);
    }
  });
});
