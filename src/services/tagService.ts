import { ITask } from "../tasks/index.js";

export class TagService {
  //- Uma task pode ter várias tags
  private tasks: ITask[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }

  addTag(taskId: number, tag: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task;
    }
  }

  removeTag(taskId: number, tag: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      //task.removeTag(tag);
    }
  }

  getTags(taskId: number) {
    // const task = this.tasks.find((t) => t.id === taskId) ;
    //return task.getTags();
  }

  getTasksByTag(tag: string) {
    //  return this.tasks.filter(
    //  (task) => task.getTags().includes(tag),
    //);
  }
}
