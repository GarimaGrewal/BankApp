import { CustomerProps } from "../interfaces/customerProps";
import { BankError, ERROR_CODES, ERROR_MESSAGES } from "../errors/bankError";
import {
  comparePasswordHash,
  generatePasswordHash,
  validateCustomer,
} from "../utils/validator";

class Customer {
  private readonly name: string;
  private balance: number;
  private readonly accountNumber: number;
  private readonly passwordHash: string;
  private readonly role: "customer" | "manager";
  private version: number;

  /**
   * Constructor for the Customer class.
   * @param props - The properties of the customer.
   * @param accountNumber - The account number of the customer.
   */
  constructor(props: CustomerProps, accountNumber: number) {
    validateCustomer(props);

    this.name = props.name;
    this.balance = props.initialDeposit;
    this.accountNumber = accountNumber;
    this.passwordHash = generatePasswordHash(props.password);
    this.role = props.role;
    this.version = 0;

    console.log(
      `Customer created: ${this.name}, Account Number: ${this.accountNumber}, Role: ${this.role}`
    );
  }

  /**
   * Deposits an amount to the customer's account.
   * @param amount - The amount to deposit.
   * @throws {BankError} - If the deposit amount is invalid.
   */
  deposit(amount: number): void {
    if (amount <= 0) {
      throw new BankError(
        ERROR_CODES.INVALID_DEPOSIT,
        ERROR_MESSAGES.INVALID_DEPOSIT
      );
    }
    this.balance += amount;
    this.version++;
    console.log(
      `Deposited ${amount} to account number: ${this.accountNumber}. New balance: ${this.balance}`
    );
  }

  /**
   * Withdraws an amount from the customer's account.
   * @param amount - The amount to withdraw.
   * @throws {BankError} - If the withdrawal amount is invalid or if there are insufficient funds.
   */
  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new BankError(
        ERROR_CODES.INSUFFICIENT_BALANCE,
        ERROR_MESSAGES.INSUFFICIENT_BALANCE
      );
    }
    if (amount <= 0) {
      throw new BankError(
        ERROR_CODES.INVALID_WITHDRAWAL,
        ERROR_MESSAGES.INVALID_WITHDRAWAL
      );
    }
    this.balance -= amount;
    this.version++;
    console.log(
      `Withdrew ${amount} from account number: ${this.accountNumber}. New balance: ${this.balance}`
    );
  }

  /** 
   * Gets the balance of the customer's account.
   * @returns The current balance.
   */
  getBalance(): number {
    console.log(
      `Balance checked for account number: ${this.accountNumber}. Current balance: ${this.balance}`
    );
    return this.balance;
  }

  /**
   * Gets the account number of the customer.
   * @returns The account number.
   */
  getAccountNumber(): number {
    console.log(`Account number retrieved: ${this.accountNumber}`);
    return this.accountNumber;
  }

  /**
   * Gets the role of the customer.
   * @returns The role of the customer.
   */
  getRole(): "customer" | "manager" {
    console.log(
      `Role retrieved for account number: ${this.accountNumber}. Role: ${this.role}`
    );
    return this.role;
  }

  /**
   * Gets the version of the customer's account.
   * @returns The version of the account.
   */
  getVersion(): number {
    console.log(
      `Version retrieved for account number: ${this.accountNumber}. Version: ${this.version}`
    );
    return this.version;
  }

  /**
   * Validates the customer's password.
   * @param password - The password to validate.
   * @returns True if the password is valid, false otherwise.
   */
  validatePassword(password: string): boolean {
    const isValid = comparePasswordHash(password, this.passwordHash);
    console.log(
      `Password validation for account number: ${this.accountNumber}. Valid: ${isValid}`
    );
    return isValid;
  }
}

export { Customer };
