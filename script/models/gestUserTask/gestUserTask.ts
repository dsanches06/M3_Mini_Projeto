import IUser from "../user/IUser.js";

export default class GestUserTask {
  users: IUser[];

  constructor() {
    this.users = [];
  }

  addUser(user: IUser): void {
    this.users.push(user);
  }
}
