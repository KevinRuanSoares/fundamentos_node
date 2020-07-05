import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Value of field Type is invalid');
    }

    if (typeof value !== 'number') {
      throw Error('Value of field Value must be number');
    }

    const balance = this.transactionsRepository.getBalance();
    const verifyTotalBalance = balance.total - value;

    if (verifyTotalBalance < 0 && type === 'outcome') {
      throw Error('Invalid value');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
