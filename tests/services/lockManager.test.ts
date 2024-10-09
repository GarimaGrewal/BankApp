import { LockManager } from "../../src/services/lockManager";
import { BankError, ERROR_CODES } from "../../src/errors/bankError";

describe("LockManager", () => {
  let lockManager: LockManager;

  beforeEach(() => {
    lockManager = new LockManager();
  });

  test("should acquire lock for an account number", () => {
    const accountNumber = 1;
    lockManager.acquireLock(accountNumber);
    expect(() => lockManager.acquireLock(accountNumber)).toThrow(BankError);
  });

  test("should throw error when acquiring lock for an already locked account number", () => {
    const accountNumber = 2;
    lockManager.acquireLock(accountNumber);
    expect(() => lockManager.acquireLock(accountNumber)).toThrow(BankError);
    expect(() => lockManager.acquireLock(accountNumber)).toThrow(
      new BankError(
        ERROR_CODES.CONCURRENT_MODIFICATION,
        `Concurrent modification detected for account number: ${accountNumber}`
      )
    );
  });

  test("should release lock for an account number", () => {
    const accountNumber = 3;
    lockManager.acquireLock(accountNumber);
    lockManager.releaseLock(accountNumber);
    expect(() => lockManager.acquireLock(accountNumber)).not.toThrow();
  });

  test("should warn when releasing lock for an account number that is not locked", () => {
    const accountNumber = 4;
    console.warn = jest.fn();
    lockManager.releaseLock(accountNumber);
    expect(console.warn).toHaveBeenCalledWith(
      `Attempted to release lock for account number: ${accountNumber}, but no lock was held.`
    );
  });
});
