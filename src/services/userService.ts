import { IUser } from "../models/index.js";
import { ITask } from "../tasks/index.js";

export class UserService {
  private static users = new Map<number, IUser>();

  static addUser(user: IUser): void {
    if (!this.users.has(user.getId())) {
      this.users.set(user.getId(), user);
    }
  }

  static removeUser(id: number): boolean {
    return this.users.delete(id);
  }

  static getActiveUsers(): IUser[] {
    return Array.from(this.users.values()).filter((user) => user.isActive());
  }

  static getInactiveUsers(): IUser[] {
    return Array.from(this.users.values()).filter((user) => !user.isActive());
  }

  static getAllUsers(): IUser[] {
    return Array.from(this.users.values());
  }

  static getUserById(id: number): IUser | undefined {
    return this.users.get(id);
  }

  static getUserByTaskId(id: number): IUser | undefined {
    for (const user of this.users.values()) {
      const task = user.getTasks().find((t) => t.getId() === id);
      if (task) {
        return user;
      }
    }
    return undefined;
  }

  static getAllUserTasks(): ITask[] {
    const users = this.getAllUsers();
    const allTasks: ITask[] = [];
    users.forEach((user) => {
      allTasks.push(...user.getTasks());
    });
    return allTasks;
  }
}
