"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionManager = void 0;
const lockManager_1 = require("./lockManager");
const bankError_1 = require("../errors/bankError");
class TransactionManager {
    /**
     * Constructor for the TransactionManager class.
     * @param customerManager - An instance of CustomerManager to manage customer data.
     */
    constructor(customerManager) {
        this.customerManager = customerManager;
        this.lockManager = new lockManager_1.LockManager();
    }
    /**
     * Deposits an amount into a specific account.
     * @param accountNumber - The account number to deposit into.
     * @param amount - The amount to deposit.
     * @throws {BankError} - If the account number is invalid.
     */
    deposit(accountNumber, amount) {
        const customer = this.customerManager.getCustomer(accountNumber);
        if (!customer) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_ACCOUNT_NUMBER, bankError_1.ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
        }
        this.lockManager.acquireLock(accountNumber);
        try {
            console.log(`Depositing ${amount} to account number: ${accountNumber}`);
            customer.deposit(amount);
        }
        finally {
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
    withdraw(accountNumber, amount, password) {
        const customer = this.customerManager.getCustomer(accountNumber);
        if (!customer) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_ACCOUNT_NUMBER, bankError_1.ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
        }
        if (!customer.validatePassword(password)) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_PASSWORD, bankError_1.ERROR_MESSAGES.INVALID_PASSWORD);
        }
        this.lockManager.acquireLock(accountNumber);
        try {
            console.log(`Withdrawing ${amount} from account number: ${accountNumber}`);
            customer.withdraw(amount);
        }
        finally {
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
    transfer(fromAccountNumber, toAccountNumber, amount, password) {
        const fromCustomer = this.customerManager.getCustomer(fromAccountNumber);
        const toCustomer = this.customerManager.getCustomer(toAccountNumber);
        if (!fromCustomer || !toCustomer) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_ACCOUNT_NUMBER, bankError_1.ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
        }
        if (!fromCustomer.validatePassword(password)) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_PASSWORD, bankError_1.ERROR_MESSAGES.INVALID_PASSWORD);
        }
        if (amount > fromCustomer.getBalance()) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INSUFFICIENT_BALANCE, bankError_1.ERROR_MESSAGES.INSUFFICIENT_BALANCE);
        }
        this.lockManager.acquireLock(fromAccountNumber);
        this.lockManager.acquireLock(toAccountNumber);
        try {
            console.log(`Transferring ${amount} from account number: ${fromAccountNumber} to account number: ${toAccountNumber}`);
            fromCustomer.withdraw(amount);
            toCustomer.deposit(amount);
        }
        finally {
            this.lockManager.releaseLock(fromAccountNumber);
            this.lockManager.releaseLock(toAccountNumber);
        }
    }
}
exports.TransactionManager = TransactionManager;
