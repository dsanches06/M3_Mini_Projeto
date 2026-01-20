import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import Task from "../../models/task/Task.js";
import ITask from "../../models/task/ITask.js";
import { Category } from "../../models/task/Category.js";
import {
  addElementInContainer,
  clearContainer,
} from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import { menuSelected } from "../dom/MenuSelected.js";
import showUserTask from "./UserTaskUI.js";
import { getUserIdFromURL, addNewUserTask, removeCompletedTasks } from "./UserTaskCRUD.js";
import { getLastId } from "../../helpers/getLastID.js";
import createAndAppendTaskForm from "./UserTaskForm.js";

/* Página de tarefas de um utilizador específico */
export default function loadUserTaskPage(gestUserTask: GestUserTask, user:User): void {

  // Adicionar título
  addElementInContainer(createHeadingTitle("h2", `TAREFAS DE ${user.name.toUpperCase()}`));

  // Adicionar contadores
  const countersSection = createUserTaskCounters();
  addElementInContainer(countersSection);

  // Container para tarefas
  const taskContainer = createSection("usersTaskContainer");
  addElementInContainer(taskContainer);

  // Atualizar contadores e mostrar tarefas
  showUserTask(user, user.tasks as Task[]);

  // Mostrar tarefas
  showUserTask(user, user.tasks as Task[]);

  // Configurar botão para abrir modal
  setupAddTaskButton(user);
}

/* Criar seção de contadores */
function createUserTaskCounters(): HTMLElement {
  const counters = createSection("userTaskCounters");
  counters.innerHTML = `
    <div>Total: <span id="totalTasks">0</span></div>
    <div>Pendentes: <span id="pendingTasks">0</span></div>
    <div>Concluídas: <span id="completedTasks">0</span></div>
    <button id="removeCompletedTaskBtn">Remover Concluídas</button>
  `;
  return counters;
}

/* Criar botão para adicionar tarefa */
function createAddTaskForm(user: User, gestUserTask: GestUserTask): HTMLElement {
  const form = createSection("addTaskForm");
  form.innerHTML = `
    <button id="addTaskUserBtn">Adicionar Tarefa</button>
  `;
  return form;
}

/* Configurar botão para abrir modal */
function setupAddTaskButton(user: User): void {
  const btn = document.querySelector("#addTaskUserBtn") as HTMLElement;
  const modal = document.querySelector("#modalUserTaskForm") as HTMLElement;
  if (btn && modal) {
    btn.onclick = () => {
      modal.style.display = "block";
    };
  }

  // Event listener para remover concluídas
  const removeBtn = document.querySelector("#removeCompletedTaskBtn") as HTMLButtonElement;
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      removeCompletedTasks(user);
    });
  }
}