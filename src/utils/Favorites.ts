/* Representação de uma classe que gerencia uma lista de favoritos genéricos */
export class Favorites<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  exists(item: T): boolean {
    return this.items.some((i) => i === item);
  }

  getAll(): T[] {
    return this.items;
  }
}
