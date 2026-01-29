import { ITask } from "../../tasks/index.js";

export function showTasksCounters(type: string, filteredTask?: ITask[]): void {
  countAllTasks("#allTasksCounter", type, filteredTask);
  countCompletedTasks("#completedTaskCounter", type, filteredTask);
  countFilterTasks("#filterTasksCounter", type, filteredTask);
  countPendingTasks("#pendingTasksCounter", type, filteredTask);
}

/* Contador de tarefas pendentes de todos os utilizadores */
function countPendingTasks(
  id: string,
  type: string,
  tasksList?: ITask[],
): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    if (type === "pending") {
      section.textContent = `${tasksList?.length}`;
    } else {
      section.textContent = "0";
    }
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de tarefas terminadas de todos os utilizadores */
function countCompletedTasks(
  id: string,
  type: string,
  tasksList?: ITask[],
): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    if (type === "completed") {
      section.textContent = `${tasksList?.length}`;
    } else {
      section.textContent = "0";
    }
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de tasks filtrados por nome*/
function countFilterTasks(id: string, type: string, tasksList?: ITask[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    if (type === "taskFiltered") {
      section.textContent = `${tasksList?.length}`;
    } else {
      section.textContent = "0";
    }
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de tarefas de todos os utilizadores */
function countAllTasks(id: string, type: string, tasksList?: ITask[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    if (type === "all") {
      section.textContent = `${tasksList?.length}`;
    } else {
      section.textContent = "0";
    }
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}
