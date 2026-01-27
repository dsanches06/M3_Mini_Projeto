import { Category } from "./Category.js";

/* Task Interface */
export default interface ITask {
  id: number;
  title: string;
  completed: boolean;
  completeDate?: Date;
  category: Category;
  markCompleted(): void;
}
