/* Gerador de IDs */
export class IdGenerator {
  private static counter: number = 0;

  // Não reinicializar o contador no construtor para manter IDs únicos
  constructor() {}

  generate(): number {
    IdGenerator.counter += 1;
    return IdGenerator.counter;
  }
}
