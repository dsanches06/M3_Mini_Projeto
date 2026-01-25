import { UserClass } from "../models/UserClass";

export class UserService {
  
  private users: UserClass[];

  constructor(users: UserClass[]) {
    this.users = users;
  }

  addUser(user: UserClass): void {
    this.users.push(user);
  }

  removeUser(id: number): void {
    const index = this.users.findIndex((u) => u.getId() === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  getActiveUsers(): UserClass[] {
    return this.users.filter((u) => u.isActive());
  }

  getAllUsers(): UserClass[] {
    return [...this.users];
  }
}
