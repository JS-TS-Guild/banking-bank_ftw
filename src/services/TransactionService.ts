import {Bank} from '../models/Bank';

export default class BankFactory {
  private static banks: Bank[] = [];

  static createBank(name: string, allowNegativeBalance?: boolean): Bank {
    const bank = new Bank(name, allowNegativeBalance);
    this.banks.push(bank);
    return bank;
  }

  static getBanks(): Bank[] {
    return this.banks;
  }
}
