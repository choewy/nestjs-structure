export class BcryptConfig {
  private readonly SALT_OR_ROUNDS: string;

  constructor(private readonly prefix: string) {
    this.SALT_OR_ROUNDS = process.env[[this.prefix, 'SALT_OR_ROUNDS'].join('_')];
  }

  public getSaltOrRounds(): number | string {
    const val = Number(this.SALT_OR_ROUNDS);

    return isNaN(val) ? this.SALT_OR_ROUNDS : val;
  }
}
