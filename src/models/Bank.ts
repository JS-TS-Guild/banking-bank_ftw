
import { v4 as uuidv4 } from 'uuid';
import { BankAccountId, UserId } from '@/types/Common';
import { BankAccount } from './Account';
import GlobalRegistry from '@/services/GlobalRegistry';

export class Bank {
  private id: string;
  private isNegativeAllowed: boolean;

  private constructor(isNegativeAllowed = false) {
    this.id = uuidv4();
    this.isNegativeAllowed = isNegativeAllowed;
    GlobalRegistry.registerBank(this);
  }

  static create(options?: { isNegativeAllowed?: boolean }): Bank {
    return new Bank(options?.isNegativeAllowed ?? false);
  }

  getId(): string {
    return this.id;
  }

  createAccount(initialBalance: number): BankAccount {
    const account = new BankAccount(this.id, initialBalance);
    GlobalRegistry.registerAccount(account);
    return account;
  }

  getAccount(accountId: BankAccountId): BankAccount {
    const accounts = GlobalRegistry.getAllAccounts();
    const account = accounts.find(
      acc => acc.getId() === accountId && acc.getBankId() === this.id
    );
    if (!account) throw new Error('Account not found');
    return account;
  }

  send(senderUserId: UserId, receiverUserId: UserId, amount: number, targetBankId = this.id): void {
    const senderAccounts = GlobalRegistry.getUserAccountsByUserIdAndBankId(senderUserId, this.id);
    const receiverAccounts = GlobalRegistry.getUserAccountsByUserIdAndBankId(receiverUserId, targetBankId);

    const sender = senderAccounts[0];
    const receiver = receiverAccounts[0];

    if (!sender || !receiver) throw new Error('No valid accounts for transfer');

    if (!this.isNegativeAllowed && sender.getBalance() < amount) {
      throw new Error('Insufficient funds');
    }

    if (this.isNegativeAllowed) {
      sender.forceWithdraw(amount);
    } else {
      sender.withdraw(amount);
    }

    receiver.deposit(amount);
  }
}
