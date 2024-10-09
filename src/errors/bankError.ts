class BankError extends Error {
  readonly errorCode: string;

  constructor(errorCode: string, errorMessage: string) {
    super(errorMessage);
    this.name = "BankError";
    this.errorCode = errorCode;
  }
}

enum ERROR_CODES {
  INVALID_NAME = "INVALID_NAME",
  INVALID_INITIAL_DEPOSIT = "INVALID_INITIAL_DEPOSIT",
  INVALID_DEPOSIT = "INVALID_DEPOSIT",
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
  INVALID_WITHDRAWAL = "INVALID_WITHDRAWAL",
  INVALID_ACCOUNT_NUMBER = "INVALID_ACCOUNT_NUMBER",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
  CONCURRENT_MODIFICATION = "CONCURRENT_MODIFICATION",
  ACCOUNT_EXISTS = "ACCOUNT_EXISTS",
}

enum ERROR_MESSAGES {
  INVALID_NAME = "Name must contain only letters",
  INVALID_INITIAL_DEPOSIT = "Initial deposit must be at least 1000",
  INVALID_DEPOSIT = "Deposit amount must be positive",
  INSUFFICIENT_BALANCE = "Insufficient balance",
  INVALID_WITHDRAWAL = "Withdrawal amount must be positive",
  INVALID_ACCOUNT_NUMBER = "Invalid account number",
  INVALID_PASSWORD = "Invalid password",
  UNAUTHORIZED_ACCESS = "Only managers can view the total balance",
  CONCURRENT_MODIFICATION = "Concurrent modification detected",
  ACCOUNT_EXISTS = "Account already exists",
}

export { BankError, ERROR_CODES, ERROR_MESSAGES };
