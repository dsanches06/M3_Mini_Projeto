import IUser from "./IUser.js";
import ITask from "../task/ITask.js";

/*  Classe Utilizador */
export default class User implements IUser {
  id: number;
  name: string;
  email: string;
  isAtive: boolean;
  tasks: ITask[];

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isAtive = true;
    this.tasks = [];
  }

  unable(): void {
    this.isAtive = false;
  }

  toggleStates(): void {
    this.isAtive = !this.isAtive;
  }

  createTask(task: ITask): void {
    this.tasks.push(task);
  }

  removeTask(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
