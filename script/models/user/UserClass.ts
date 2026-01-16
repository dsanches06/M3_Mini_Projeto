import IUser from "./IUser.js";

/*  Classe UtilizadorClass */
export default class UserClass implements IUser {
  id: number;
  name: string;
  email: string;
  isAtive: boolean;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isAtive = true;
  }

  desativar(): void {
    this.isAtive = false;
  }

  toggleEstado(): void {
    this.isAtive = !this.isAtive;
  }
}
