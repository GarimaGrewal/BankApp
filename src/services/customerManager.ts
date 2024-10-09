import { Customer } from "./customer";
import { CustomerProps } from "../interfaces/customerProps";
import { BankError, ERROR_CODES, ERROR_MESSAGES } from "../errors/bankError";

class CustomerManager {
  private readonly customers: Map<number, Customer>;

  /**
   * Constructor for the CustomerManager class.
   * Initializes an empty map to store customers.
   */
  constructor() {
    this.customers = new Map();
  }

  /**
   * Creates a new customer and adds them to the customers map.
   * @param {CustomerProps} props - The properties of the customer.
   * @param {number} accountNumber - The account number of the customer.
   * @throws {BankError} - If an account with the same account number already exists.
   */
  createCustomer(props: CustomerProps, accountNumber: number): void {
    if (this.customers.has(accountNumber)) {
      throw new BankError(
        ERROR_CODES.ACCOUNT_EXISTS,
        ERROR_MESSAGES.ACCOUNT_EXISTS
      );
    }

    const customer = new Customer(props, accountNumber);
    this.customers.set(accountNumber, customer);
    console.log(
      `Customer created: ${customer.getAccountNumber()}, Name: ${
        props.name
      }, Role: ${props.role}`
    );
  }

  /**
   * Retrieves a customer by their account number.
   * @param {number} accountNumber - The account number of the customer.
   * @returns {Customer | undefined} - The customer object or undefined if not found.
   */
  getCustomer(accountNumber: number): Customer | undefined {
    const customer = this.customers.get(accountNumber);
    if (!customer) {
      console.warn(
        `Attempted to retrieve non-existent customer with account number: ${accountNumber}`
      );
    }
    return customer;
  }

  /**
   * Retrieves the balance of a customer's account.
   * @param {number} accountNumber - The account number of the customer.
   * @param {string} password - The password of the customer.
   * @returns {number} - The balance of the customer's account.
   * @throws {BankError} - If the account number is invalid or the password is incorrect.
   */
  getCustomerBalance(accountNumber: number, password: string): number {
    const customer = this.getCustomer(accountNumber);
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

    const balance = customer.getBalance();
    console.log(
      `Balance retrieved for account number: ${accountNumber}. Balance: ${balance}`
    );
    return balance;
  }

  /**
   * Retrieves the total balance of all customer accounts.
   * @returns {number} - The total balance of all accounts.
   */
  getTotalBalance(): number {
    let totalBalance = 0;
    this.customers.forEach((customer) => {
      totalBalance += customer.getBalance();
    });
    console.log(`Total balance retrieved: ${totalBalance}`);
    return totalBalance;
  }
}

export { CustomerManager };
