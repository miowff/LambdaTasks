import { CurrencyModel } from '../../models/currency-model';
import db from '../databse';
import { BaseRepository } from './base-repository';

class CurrenciesRepository extends BaseRepository<CurrencyModel> {
  async isInFavouritesAsync(
    userId: number,
    currencyId: string,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.db.get(
        `SELECT * FROM userCurrency WHERE UserId = ${userId} AND CurrencyId = '${currencyId}'`,
        (err, result) => {
          if (err) {
            throw err;
          }
          if (!result) {
            resolve(false);
          }
          resolve(true);
        },
      );
    });
  }
  async addToFavouritesAsync(userId: number, currencyId: string) {
    await db.run(
      `INSERT INTO userCurrency(UserId,CurrencyId) values(${userId},'${currencyId}')`,
    );
  }
}

const currenciesRepository = new CurrenciesRepository('currencies', db);
export default currenciesRepository;
