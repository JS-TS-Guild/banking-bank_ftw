
import { v4 as uuidv4 } from 'uuid';
import { BankAccountId, UserId } from '@/types/common';
import GlobalRegistry from '@/services/GlobalRegistry';

export class User {
  private id: UserId;
  private name: string;
  private accountIds: BankAccountId[];

  private constructor(name: string, accountIds: BankAccountId[]) {
    this.id = uuidv4();
    this.name = name;
    this.accountIds = accountIds;
    GlobalRegistry.registerUser(this);
  }

  static create(name: string, accountIds: BankAccountId[]): User {
    return new User(name, accountIds);
  }

  getId(): UserId {
    return this.id;
  }

  getAccountIds(): BankAccountId[] {
    return this.accountIds;
  }
}
