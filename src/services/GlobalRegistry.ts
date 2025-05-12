

import {Bank} from '@/models/Bank';
import {BankAccount} from '@/models/Account';
import {User} from '@/models/user';
import { UserId } from '@/types/Common';

export default class GlobalRegistry {
  private static banks: Bank[] = [];
  private static accounts: BankAccount[] = [];
  private static users: User[] = [];

  static clear(): void {
    this.banks = [];
    this.accounts = [];
    this.users = [];
  }

  static registerBank(bank: Bank): void {
    this.banks.push(bank);
  }

  static registerAccount(account: BankAccount): void {
    this.accounts.push(account);
  }

  static registerUser(user: User): void {
    this.users.push(user);
  }

  static getUserAccountsByUserIdAndBankId(userId: UserId, bankId: string): BankAccount[] {
    const user = this.users.find(u => u.getId() === userId);
    if (!user) return [];
    const accountIds = user.getAccountIds();
    return this.accounts.filter(acc => acc.getBankId() === bankId && accountIds.includes(acc.getId()));
  }

  static getAllAccounts(): BankAccount[] {
    return this.accounts;
  }
}
