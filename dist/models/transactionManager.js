"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionManager = void 0;
const lockManager_1 = require("./lockManager");
const bankError_1 = require("../errors/bankError");
class TransactionManager {
    constructor(customerManager) {
        this.customerManager = customerManager;
        this.lockManager = new lockManager_1.LockManager();
    }
    deposit(accountNumber, amount) {
        const customer = this.customerManager.getCustomer(accountNumber);
        if (!customer) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_ACCOUNT_NUMBER, bankError_1.ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
        }
        this.lockManager.acquireLock(accountNumber);
        try {
            customer.deposit(amount);
        }
        finally {
            this.lockManager.releaseLock(accountNumber);
        }
    }
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
            customer.withdraw(amount);
        }
        finally {
            this.lockManager.releaseLock(accountNumber);
        }
    }
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
