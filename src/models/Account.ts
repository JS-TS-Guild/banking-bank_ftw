

import { v4 as uuidv4 } from 'uuid';
import { BankAccountId } from '@/types/common';

export class BankAccount {
  private id: BankAccountId;
  private bankId: string;
  private balance: number;

  constructor(bankId: string, initialBalance: number) {
    this.id = uuidv4();
    this.bankId = bankId;
    this.balance = initialBalance;
  }

  getId(): BankAccountId {
    return this.id;
  }

  getBankId(): string {
    return this.bankId;
  }

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.balance < amount) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }

  forceWithdraw(amount: number): void {
    this.balance -= amount;
  }
}
