import { Tag } from "tags/Tag";
import { ITask } from "../tasks/ITask";

export class TagService {
  //- Uma task pode ter várias tags
  private tasks: ITask[];
  private tags: Tag[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
    this.tags = [];
  }

  addTag(taskId: number, tag: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.tags.push(new Tag(tag, taskId));
    }
  }

  removeTag(taskId: number, tag: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.tags = this.tags.filter(
        (t) => !(t.getTaskId() === taskId && t.getName() === tag),
      );
    }
  }

  getTags(taskId: number) {
    return this.tags.filter((t) => t.getTaskId() === taskId);
  }

  getTasksByTag(tag: string) {
    const taggedTaskIds = this.tags
      .filter((t) => t.getName() === tag)
      .map((t) => t.getTaskId());
    return this.tasks.filter((task) => taggedTaskIds.includes(task.id));
  }
}
