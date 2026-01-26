import IUser from "../models/IUser.js";

export class UserService {
  private users: IUser[];

  constructor() {
    this.users = [];
  }

  addUser(user: IUser): void {
    this.users.push(user);
  }

  removeUser(id: number): void {
    const index = this.users.findIndex((u) => u.getId() === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  getActiveUsers(): IUser[] {
    return this.users.filter((u) => u.isActive());
  }

  getAllUsers(): IUser[] {
    return this.users;
  }
}
