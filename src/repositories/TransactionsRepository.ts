import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ListTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ListTransactions {
    const listTransactions: ListTransactions = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return listTransactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const income = transactions.reduce(
      (a, b) => a + (b.type === 'income' ? b.value : 0),
      0,
    );
    const outcome = transactions.reduce(
      (a, b) => a + (b.type === 'outcome' ? b.value : 0),
      0,
    );
    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}
export default TransactionsRepository;
