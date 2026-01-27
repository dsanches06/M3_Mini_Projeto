import { IUser } from "../models/index.js";

export class UserService {
  private users: Map<number, IUser>;

  constructor() {
    this.users = new Map<number, IUser>();
  }

  addUser(user: IUser): void {
    if (!this.users.has(user.getId())) {
      this.users.set(user.getId(), user);
    }
  }

  removeUser(id: number): boolean {
    return this.users.delete(id);
  }

  getActiveUsers(): IUser[] {
    return Array.from(this.users.values()).filter((user) => user.isActive());
  }

  getInactiveUsers(): IUser[] {
    return Array.from(this.users.values()).filter((user) => !user.isActive());
  }

  getAllUsers(): IUser[] {
    return Array.from(this.users.values());
  }

  getUserById(id: number): IUser | undefined {
    return this.users.get(id);
  }
}
