"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerManager = void 0;
const customer_1 = require("./customer");
const bankError_1 = require("../errors/bankError");
class CustomerManager {
    constructor() {
        this.customers = new Map();
    }
    createCustomer(props, accountNumber) {
        const customer = new customer_1.Customer(props, accountNumber);
        this.customers.set(accountNumber, customer);
    }
    getCustomer(accountNumber) {
        return this.customers.get(accountNumber);
    }
    getCustomerBalance(accountNumber, password) {
        const customer = this.getCustomer(accountNumber);
        if (!customer) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_ACCOUNT_NUMBER, bankError_1.ERROR_MESSAGES.INVALID_ACCOUNT_NUMBER);
        }
        // Ensure password validation before showing the balance
        if (!customer.validatePassword(password)) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_PASSWORD, bankError_1.ERROR_MESSAGES.INVALID_PASSWORD);
        }
        return customer.getBalance();
    }
    getTotalBalance() {
        let totalBalance = 0;
        this.customers.forEach((customer) => {
            totalBalance += customer.getBalance();
        });
        return totalBalance;
    }
}
exports.CustomerManager = CustomerManager;
