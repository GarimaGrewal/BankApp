import { CustomerManager } from "./customerManager";
import { LockManager } from "./lockManager";
import { BankError, ERROR_CODES, ERROR_MESSAGES } from "../errors/bankError";

class TransactionManager {
  private readonly customerManager: CustomerManager;
  private readonly lockManager: LockManager;

  /**
   * Constructor for the TransactionManager class.
   * @param customerManager - An instance of CustomerManager to manage customer data.
   */
  constructor(customerManager: CustomerManager) {
    this.customerManager = customerManager;
    this.lockManager = new LockManager();
  }

  /**
   * Deposits an amount into a specific account.
   * @param accountNumber - The account number to deposit into.
   * @param amount - The amount to deposit.
   * @throws {BankError} - If the account number is invalid.
   */
  deposit(accountNumber: number, amount: number): void {
    const customer = this.customerManager.getCustomer(accountNumber);
    if (!customer) {
      throw new BankError(
        ERROR_CODES.INVALID_ACCOUNT_NUMBER,
        ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER
      );
    }

    this.lockManager.acquireLock(accountNumber);
    try {
      console.log(`Depositing ${amount} to account number: ${accountNumber}`);
      customer.deposit(amount);
    } finally {
      this.lockManager.releaseLock(accountNumber);
    }
  }

  /**
   * Withdraws an amount from a specific account.
   * @param accountNumber - The account number to withdraw from.
   * @param amount - The amount to withdraw.
   * @param password - The password of the account.
   * @throws {BankError} - If the account number is invalid or the password is incorrect.
   */
  withdraw(accountNumber: number, amount: number, password: string): void {
    const customer = this.customerManager.getCustomer(accountNumber);
    if (!customer) {
      throw new BankError(
        ERROR_CODES.INVALID_ACCOUNT_NUMBER,
        ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER
      );
    }

    if (!customer.validatePassword(password)) {
      throw new BankError(
        ERROR_CODES.INVALID_PASSWORD,
        ERROR_MESSAGES.INVALID_PASSWORD
      );
    }

    this.lockManager.acquireLock(accountNumber);
    try {
      console.log(
        `Withdrawing ${amount} from account number: ${accountNumber}`
      );
      customer.withdraw(amount);
    } finally {
      this.lockManager.releaseLock(accountNumber);
    }
  }

  /**
   * Transfers an amount from one account to another.
   * @param fromAccountNumber - The account number to transfer from.
   * @param toAccountNumber - The account number to transfer to.
   * @param amount - The amount to transfer.
   * @param password - The password of the from account.
   * @throws {BankError} - If any account number is invalid, the password is incorrect, or there is insufficient balance.
   */
  transfer(
    fromAccountNumber: number,
    toAccountNumber: number,
    amount: number,
    password: string
  ): void {
    const fromCustomer = this.customerManager.getCustomer(fromAccountNumber);
    const toCustomer = this.customerManager.getCustomer(toAccountNumber);

    if (!fromCustomer || !toCustomer) {
      throw new BankError(
        ERROR_CODES.INVALID_ACCOUNT_NUMBER,
        ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER
      );
    }

    if (!fromCustomer.validatePassword(password)) {
      throw new BankError(
        ERROR_CODES.INVALID_PASSWORD,
        ERROR_MESSAGES.INVALID_PASSWORD
      );
    }

    if (amount > fromCustomer.getBalance()) {
      throw new BankError(
        ERROR_CODES.INSUFFICIENT_BALANCE,
        ERROR_MESSAGES.INSUFFICIENT_BALANCE
      );
    }

    this.lockManager.acquireLock(fromAccountNumber);
    this.lockManager.acquireLock(toAccountNumber);

    try {
      console.log(
        `Transferring ${amount} from account number: ${fromAccountNumber} to account number: ${toAccountNumber}`
      );
      fromCustomer.withdraw(amount);
      toCustomer.deposit(amount);
    } finally {
      this.lockManager.releaseLock(fromAccountNumber);
      this.lockManager.releaseLock(toAccountNumber);
    }
  }
}

export { TransactionManager };
