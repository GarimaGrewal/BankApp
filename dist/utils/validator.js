"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomer = validateCustomer;
exports.generatePasswordHash = generatePasswordHash;
exports.comparePasswordHash = comparePasswordHash;
const bcrypt_1 = __importDefault(require("bcrypt"));
const bankError_1 = require("../errors/bankError");
/**
 * Validates the properties of a customer.
 * @param {CustomerProps} props - The properties of the customer.
 * @throws {BankError} - If the customer's name is invalid or the initial deposit is less than 1000.
 */
function validateCustomer(props) {
    // Validate the customer's name to ensure it contains only letters
    if (!/^[a-zA-Z]+$/.test(props.name)) {
        throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_NAME, bankError_1.ERROR_MESSAGES.INVALID_NAME);
    }
    // Validate the initial deposit to ensure it is at least 1000
    if (props.initialDeposit < 1000) {
        throw new bankError_1.BankError(bankError_1.ERROR_CODES.INVALID_INITIAL_DEPOSIT, bankError_1.ERROR_MESSAGES.INVALID_INITIAL_DEPOSIT);
    }
}
/**
 * Generates a hashed password using bcrypt.
 * @param {string} password - The plain text password.
 * @returns {string} - The hashed password.
 */
function generatePasswordHash(password) {
    // Generate a hash of the password with a salt rounds of 10
    return bcrypt_1.default.hashSync(password, 10);
}
/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hash - The hashed password.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
function comparePasswordHash(password, hash) {
    // Compare the plain text password with the hashed password
    return bcrypt_1.default.compareSync(password, hash);
}
