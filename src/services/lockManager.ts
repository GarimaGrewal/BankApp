import { BankError, ERROR_CODES } from "../errors/bankError";

class LockManager {
  private locks: Map<number, boolean>;

  /**
   * Constructor for the LockManager class.
   * Initializes an empty map to store locks.
   */
  constructor() {
    this.locks = new Map();
  }

  /**
   * Acquires a lock for a specific account number.
   * @param accountNumber - The account number to lock.
   * @throws {BankError} - If the account is already locked.
   */
  acquireLock(accountNumber: number): void {
    if (this.locks.get(accountNumber)) {
      throw new BankError(
        ERROR_CODES.CONCURRENT_MODIFICATION,
        `Concurrent modification detected for account number: ${accountNumber}`
      );
    }
    this.locks.set(accountNumber, true);
    console.log(`Lock acquired for account number: ${accountNumber}`);
  }

  /**
   * Releases a lock for a specific account number.
   * @param accountNumber - The account number to unlock.
   */
  releaseLock(accountNumber: number): void {
    if (this.locks.has(accountNumber) && this.locks.get(accountNumber)) {
      this.locks.set(accountNumber, false);
      console.log(`Lock released for account number: ${accountNumber}`);
    } else {
      console.warn(
        `Attempted to release lock for account number: ${accountNumber}, but no lock was held.`
      );
    }
  }
}

export { LockManager };
