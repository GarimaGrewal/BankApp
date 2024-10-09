"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockManager = void 0;
const bankError_1 = require("../errors/bankError");
class LockManager {
    constructor() {
        this.locks = new Map();
    }
    acquireLock(accountNumber) {
        if (this.locks.get(accountNumber)) {
            throw new bankError_1.BankError(bankError_1.ERROR_CODES.CONCURRENT_MODIFICATION, "Concurrent modification detected");
        }
        this.locks.set(accountNumber, true);
    }
    releaseLock(accountNumber) {
        this.locks.set(accountNumber, false);
    }
}
exports.LockManager = LockManager;
