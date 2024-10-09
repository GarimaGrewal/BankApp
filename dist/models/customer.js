"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const bankError_1 = require("../errors/bankError");
const validator_1 = require("../utils/validator");
class Customer {
    constructor(props, accountNumber) {
        (0, validator_1.validateCustomer)(props);
        this.name = props.name;
        this.balance = props.initialDeposit;
        this.accountNumber = accountNumber;
        this.passwordHash = (0, validator_1.generatePasswordHash)(props.password);
        this.role = props.role;
        this.version = 0;
    }
    deposit(amount) {
        if (amount <= 0) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_DEPOSIT, bankError_1.ERROR_MESSAGES.INVALID_DEPOSIT);
        }
        this.balance += amount;
        this.version++;
    }
    withdraw(amount) {
        if (amount > this.balance) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INSUFFICIENT_BALANCE, bankError_1.ERROR_MESSAGES.INSUFFICIENT_BALANCE);
        }
        if (amount <= 0) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_WITHDRAWAL, bankError_1.ERROR_MESSAGES.INVALID_WITHDRAWAL);
        }
        this.balance -= amount;
        this.version++;
    }
    getBalance() {
        return this.balance;
    }
    getAccountNumber() {
        return this.accountNumber;
    }
    getRole() {
        return this.role;
    }
    getVersion() {
        return this.version;
    }
    validatePassword(password) {
        return (0, validator_1.comparePasswordHash)(password, this.passwordHash);
    }
}
exports.Customer = Customer;
