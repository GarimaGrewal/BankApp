"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.ERROR_CODES = exports.BankError = void 0;
class BankError extends Error {
    constructor(errorCode, errorMessage) {
        super(errorMessage);
        this.name = "BankError";
        this.errorCode = errorCode;
    }
}
exports.BankError = BankError;
var ERROR_CODES;
(function (ERROR_CODES) {
    ERROR_CODES["INVALID_NAME"] = "INVALID_NAME";
    ERROR_CODES["INVALID_INITIAL_DEPOSIT"] = "INVALID_INITIAL_DEPOSIT";
    ERROR_CODES["INVALID_DEPOSIT"] = "INVALID_DEPOSIT";
    ERROR_CODES["INSUFFICIENT_BALANCE"] = "INSUFFICIENT_BALANCE";
    ERROR_CODES["INVALID_WITHDRAWAL"] = "INVALID_WITHDRAWAL";
    ERROR_CODES["INVALID_ACCOUNT_NUMBER"] = "INVALID_ACCOUNT_NUMBER";
    ERROR_CODES["INVALID_PASSWORD"] = "INVALID_PASSWORD";
    ERROR_CODES["UNAUTHORIZED_ACCESS"] = "UNAUTHORIZED_ACCESS";
    ERROR_CODES["CONCURRENT_MODIFICATION"] = "CONCURRENT_MODIFICATION";
    ERROR_CODES["ACCOUNT_EXISTS"] = "ACCOUNT_EXISTS";
})(ERROR_CODES || (exports.ERROR_CODES = ERROR_CODES = {}));
var ERROR_MESSAGES;
(function (ERROR_MESSAGES) {
    ERROR_MESSAGES["INVALID_NAME"] = "Name must contain only letters";
    ERROR_MESSAGES["INVALID_INITIAL_DEPOSIT"] = "Initial deposit must be at least 1000";
    ERROR_MESSAGES["INVALID_DEPOSIT"] = "Deposit amount must be positive";
    ERROR_MESSAGES["INSUFFICIENT_BALANCE"] = "Insufficient balance";
    ERROR_MESSAGES["INVALID_WITHDRAWAL"] = "Withdrawal amount must be positive";
    ERROR_MESSAGES["INVALID_ACCOUNT_NUMBER"] = "Invalid account number";
    ERROR_MESSAGES["INVALID_PASSWORD"] = "Invalid password";
    ERROR_MESSAGES["UNAUTHORIZED_ACCESS"] = "Only managers can view the total balance";
    ERROR_MESSAGES["CONCURRENT_MODIFICATION"] = "Concurrent modification detected";
    ERROR_MESSAGES["ACCOUNT_EXISTS"] = "Account already exists";
})(ERROR_MESSAGES || (exports.ERROR_MESSAGES = ERROR_MESSAGES = {}));
