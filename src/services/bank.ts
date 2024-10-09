import { CustomerManager } from "./customerManager";
import { TransactionManager } from "./transactionManager";
import { LockManager } from "./lockManager";
import { CustomerProps } from "../interfaces/customerProps";
import { Customer } from "./customer";
import { BankError, ERROR_CODES, ERROR_MESSAGES } from "../errors/bankError";

class Bank {
  private static instance: Bank;
  private readonly customerManager: CustomerManager;
  private readonly transactionManager: TransactionManager;
  private readonly lockManager: LockManager;
  private nextAccountNumber: number;

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes the customer manager, transaction manager, lock manager, and sets the next account number.
   */
  private constructor() {
    this.customerManager = new CustomerManager();
    this.transactionManager = new TransactionManager(this.customerManager);
    this.lockManager = new LockManager();
    this.nextAccountNumber = 1;
  }

  /**
   * Returns the singleton instance of the Bank class.
   * If the instance does not exist, it creates one.
   * @returns {Bank} The singleton instance of the Bank class.
   */
  static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
      console.log("Bank instance created.");
    }
    return Bank.instance;
  }

  /**
   * Resets the singleton instance of the Bank class.
   * Useful for testing purposes.
   */
  static resetInstance(): void {
    Bank.instance = new Bank();
    console.log("Bank instance reset.");
  }

  /**
   * Creates a new customer account.
   * @param {CustomerProps} props - The properties of the customer.
   * @returns {number} The account number of the newly created account.
   */
  createAccount(props: CustomerProps): number {
    const accountNumber = this.nextAccountNumber;
    this.customerManager.createCustomer(props, accountNumber);
    console.log(`Account created with account number: ${accountNumber}`);
    this.nextAccountNumber++;
    return accountNumber;
  }

  /**
   * Deposits an amount into a specific account.
   * @param {number} accountNumber - The account number to deposit into.
   * @param {number} amount - The amount to deposit.
   */
  deposit(accountNumber: number, amount: number): void {
    this.transactionManager.deposit(accountNumber, amount);
    console.log(`Deposited ${amount} to account number: ${accountNumber}`);
  }

  /**
   * Withdraws an amount from a specific account.
   * @param {number} accountNumber - The account number to withdraw from.
   * @param {number} amount - The amount to withdraw.
   * @param {string} password - The password of the account.
   */
  withdraw(accountNumber: number, amount: number, password: string): void {
    this.transactionManager.withdraw(accountNumber, amount, password);
    console.log(`Withdrew ${amount} from account number: ${accountNumber}`);
  }

  /**
   * Transfers an amount from one account to another.
   * @param {number} fromAccountNumber - The account number to transfer from.
   * @param {number} toAccountNumber - The account number to transfer to.
   * @param {number} amount - The amount to transfer.
   * @param {string} password - The password of the from account.
   */
  transfer(
    fromAccountNumber: number,
    toAccountNumber: number,
    amount: number,
    password: string
  ): void {
    this.transactionManager.transfer(
      fromAccountNumber,
      toAccountNumber,
      amount,
      password
    );
    console.log(
      `Transferred ${amount} from account number: ${fromAccountNumber} to account number: ${toAccountNumber}`
    );
  }

  /**
   * Gets the balance of a specific account.
   * @param {number} accountNumber - The account number to check the balance of.
   * @param {string} password - The password of the account.
   * @returns {number} The balance of the account.
   */
  getCustomerBalance(accountNumber: number, password: string): number {
    const balance = this.customerManager.getCustomerBalance(
      accountNumber,
      password
    );
    console.log(
      `Checked balance for account number: ${accountNumber}. Balance: ${balance}`
    );
    return balance;
  }

  /**
   * Gets the total balance of all accounts.
   * Only accessible by a manager.
   * @param {Customer} requestingCustomer - The customer requesting the total balance.
   * @returns {number} The total balance of all accounts.
   * @throws {BankError} - If the requesting customer is not a manager.
   */
  getTotalBalance(requestingCustomer: Customer): number {
    if (requestingCustomer.getRole() !== "manager") {
      throw new BankError(
        ERROR_CODES.UNAUTHORIZED_ACCESS,
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS
      );
    }
    const totalBalance = this.customerManager.getTotalBalance();
    console.log(
      `Total balance accessed by manager: ${requestingCustomer.getRole()}. Total balance: ${totalBalance}`
    );
    return totalBalance;
  }
}

export { Bank };
