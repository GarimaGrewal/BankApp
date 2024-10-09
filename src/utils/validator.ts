import bcrypt from "bcrypt";
import { CustomerProps } from "../interfaces/customerProps";
import { BankError, ERROR_CODES, ERROR_MESSAGES } from "../errors/bankError";

/**
 * Validates the properties of a customer.
 * @param {CustomerProps} props - The properties of the customer.
 * @throws {BankError} - If the customer's name is invalid or the initial deposit is less than 1000.
 */
export function validateCustomer(props: CustomerProps): void {
  // Validate the customer's name to ensure it contains only letters
  if (!/^[a-zA-Z]+$/.test(props.name)) {
    throw new BankError(ERROR_CODES.INVALID_NAME, ERROR_MESSAGES.INVALID_NAME);
  }
  // Validate the initial deposit to ensure it is at least 1000
  if (props.initialDeposit < 1000) {
    throw new BankError(
      ERROR_CODES.INVALID_INITIAL_DEPOSIT,
      ERROR_MESSAGES.INVALID_INITIAL_DEPOSIT
    );
  }
}

/**
 * Generates a hashed password using bcrypt.
 * @param {string} password - The plain text password.
 * @returns {string} - The hashed password.
 */
export function generatePasswordHash(password: string): string {
  // Generate a hash of the password with a salt rounds of 10
  return bcrypt.hashSync(password, 10);
}

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hash - The hashed password.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
export function comparePasswordHash(password: string, hash: string): boolean {
  // Compare the plain text password with the hashed password
  return bcrypt.compareSync(password, hash);
}
