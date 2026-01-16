import ITask from "./ITask.js";
import { Category } from "./Category.js";
import IUser from "../user/IUser.js";

/* Task Class */
export default class Task implements ITask {
  id: number;
  title: string;
  completed: boolean;
  completeDate?: Date;
  category: Category;
  user: IUser;

  constructor(id: number, title: string, category: Category, user: IUser) {
    this.id = id;
    this.title = title;
    this.completed = false;
    this.category = category;
    this.user = user;
  }

  markCompleted(): void {
    this.completed = true;
    this.completeDate = new Date();
  }
}
