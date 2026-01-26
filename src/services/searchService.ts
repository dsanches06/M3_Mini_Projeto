import IUser from "./../models/IUser";
import ITask from "../tasks/ITask";
import { TaskStatus } from "../tasks/TaskStatus";

//Dicas:
// Pesquisa por texto, utilizador e estado

export class SearchService {
  private users: IUser[];
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  searchByTitle(text: string) {
    return this.tasks.filter((task) => task.getTitle().includes(text));
  }

  searchByUser(userId: number) {
    return this.users.find((u) => u.getId() === userId);
  }

  searchByStatus(status: TaskStatus) {
    return this.tasks.filter((task) => task.getStatus() === status);
  }

  globalSearch(query: any) {
    let results: any = [];

    if (query.title) {
      results = results.concat(this.searchByTitle(query.title));
    }

    if (query.userId) {
      results = results.concat(this.searchByUser(query.userId));
    }

    if (query.status) {
      results = results.concat(this.searchByStatus(query.status));
    }
    const uniqueIds = new Set();
    const uniqueResults = results.filter((item: any) => {
      const id = item.getId();
      if (!uniqueIds.has(id)) {
        uniqueIds.add(id);
      }
    });
    return uniqueResults;
  }
}
