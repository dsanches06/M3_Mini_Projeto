/* Gerador de IDs */
export class IdGenerator {
  private counter: number;

  constructor() {
    this.counter = 0;
  }

  generate(): number {
    this.counter += 1;
    return this.counter;
  }
}
