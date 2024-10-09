"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
const customerManager_1 = require("./customerManager");
const transactionManager_1 = require("./transactionManager");
const lockManager_1 = require("./lockManager");
const bankError_1 = require("../errors/bankError");
class Bank {
    constructor() {
        this.customerManager = new customerManager_1.CustomerManager();
        this.transactionManager = new transactionManager_1.TransactionManager(this.customerManager);
        this.lockManager = new lockManager_1.LockManager();
        this.nextAccountNumber = 1;
    }
    static getInstance() {
        if (!Bank.instance) {
            Bank.instance = new Bank();
        }
        return Bank.instance;
    }
    static resetInstance() {
        Bank.instance = new Bank();
    }
    createAccount(props) {
        const accountNumber = this.nextAccountNumber;
        this.customerManager.createCustomer(props, accountNumber);
        this.nextAccountNumber++;
        return accountNumber;
    }
    deposit(accountNumber, amount) {
        this.transactionManager.deposit(accountNumber, amount);
    }
    withdraw(accountNumber, amount, password) {
        this.transactionManager.withdraw(accountNumber, amount, password);
    }
    transfer(fromAccountNumber, toAccountNumber, amount, password) {
        this.transactionManager.transfer(fromAccountNumber, toAccountNumber, amount, password);
    }
    getCustomerBalance(accountNumber, password) {
        return this.customerManager.getCustomerBalance(accountNumber, password);
    }
    getTotalBalance(requestingCustomer) {
        if (requestingCustomer.getRole() !== 'manager') {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.UNAUTHORIZED_ACCESS, bankError_1.ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
        }
        return this.customerManager.getTotalBalance();
    }
}
exports.Bank = Bank;
