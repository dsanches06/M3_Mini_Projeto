import IUser from "../models/UserClass";

export class UserService {
  private users: IUser[];

  constructor(users: IUser[]) {
    this.users = users;
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
