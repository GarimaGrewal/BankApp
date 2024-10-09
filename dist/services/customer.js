"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const bankError_1 = require("../errors/bankError");
const validator_1 = require("../utils/validator");
class Customer {
    /**
     * Constructor for the Customer class.
     * @param props - The properties of the customer.
     * @param accountNumber - The account number of the customer.
     */
    constructor(props, accountNumber) {
        (0, validator_1.validateCustomer)(props);
        this.name = props.name;
        this.balance = props.initialDeposit;
        this.accountNumber = accountNumber;
        this.passwordHash = (0, validator_1.generatePasswordHash)(props.password);
        this.role = props.role;
        this.version = 0;
        console.log(`Customer created: ${this.name}, Account Number: ${this.accountNumber}, Role: ${this.role}`);
    }
    /**
     * Deposits an amount to the customer's account.
     * @param amount - The amount to deposit.
     * @throws {BankError} - If the deposit amount is invalid.
     */
    deposit(amount) {
        if (amount <= 0) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_DEPOSIT, bankError_1.ERROR_MESSAGES.INVALID_DEPOSIT);
        }
        this.balance += amount;
        this.version++;
        console.log(`Deposited ${amount} to account number: ${this.accountNumber}. New balance: ${this.balance}`);
    }
    /**
     * Withdraws an amount from the customer's account.
     * @param amount - The amount to withdraw.
     * @throws {BankError} - If the withdrawal amount is invalid or if there are insufficient funds.
     */
    withdraw(amount) {
        if (amount > this.balance) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INSUFFICIENT_BALANCE, bankError_1.ERROR_MESSAGES.INSUFFICIENT_BALANCE);
        }
        if (amount <= 0) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_WITHDRAWAL, bankError_1.ERROR_MESSAGES.INVALID_WITHDRAWAL);
        }
        this.balance -= amount;
        this.version++;
        console.log(`Withdrew ${amount} from account number: ${this.accountNumber}. New balance: ${this.balance}`);
    }
    /**
     * Gets the balance of the customer's account.
     * @returns The current balance.
     */
    getBalance() {
        console.log(`Balance checked for account number: ${this.accountNumber}. Current balance: ${this.balance}`);
        return this.balance;
    }
    /**
     * Gets the account number of the customer.
     * @returns The account number.
     */
    getAccountNumber() {
        console.log(`Account number retrieved: ${this.accountNumber}`);
        return this.accountNumber;
    }
    /**
     * Gets the role of the customer.
     * @returns The role of the customer.
     */
    getRole() {
        console.log(`Role retrieved for account number: ${this.accountNumber}. Role: ${this.role}`);
        return this.role;
    }
    /**
     * Gets the version of the customer's account.
     * @returns The version of the account.
     */
    getVersion() {
        console.log(`Version retrieved for account number: ${this.accountNumber}. Version: ${this.version}`);
        return this.version;
    }
    /**
     * Validates the customer's password.
     * @param password - The password to validate.
     * @returns True if the password is valid, false otherwise.
     */
    validatePassword(password) {
        const isValid = (0, validator_1.comparePasswordHash)(password, this.passwordHash);
        console.log(`Password validation for account number: ${this.accountNumber}. Valid: ${isValid}`);
        return isValid;
    }
}
exports.Customer = Customer;
