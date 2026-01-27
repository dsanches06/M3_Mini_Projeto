

import User from "../../models/UserClass.js";
import UserService from "../../services/userService.js";
import ITask from "../../tasks/ITask.js";
import { getLastId } from "../../helpers/getLastID.js";
import { addNewUserTask } from "./UserTaskCRUD.js";
import { showUserTask } from "../usertask/UserTaskUI.js";
import Task from "../../tasks/Task.js";
import { showInfoBanner } from "../../helpers/infoBanner.js";


/**
 * 1. Função para criar e montar o formulário no DOM
 */
export default function createAndAppendTaskForm(
  containerId: string,
  user: User,
  UserService: UserService,
): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Criar o modal
  const modal = document.createElement("div");
  modal.id = "modalUserTaskForm";
  modal.className = "modal";
  modal.style.display = "none";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.innerHTML = "&times;";

  // Criar os elementos do form
  const form = document.createElement("form");
  form.id = "formTaskUser";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "titleInput";
  titleInput.placeholder = "Inserir o título da tarefa";

  const categorySelect = document.createElement("select");
  categorySelect.id = "taskCategory";

  // Adicionar opções ao Select
  ["Trabalho", "Pessoal", "Estudo"].forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    categorySelect.appendChild(option);
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Adicionar";

  // Montar a estrutura
  form.append(titleInput, categorySelect, submitBtn);
  modalContent.append(closeBtn, form);
  modal.appendChild(modalContent);
  container.appendChild(modal);

  // Ligar os eventos
  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });
  form.addEventListener("submit", (e) =>
    handleFormSubmit(e, user, UserService),
  );
}

/**
 * 2. Função para processar os dados
 */
const handleFormSubmit = (
  event: Event,
  user: User,
  UserService: UserService,
): void => {
  event.preventDefault();

  // Usamos querySelector dentro do target para garantir que pegamos os elementos deste formulário
  const form = event.currentTarget as HTMLFormElement;
  const title = (form.querySelector("#titleInput") as HTMLInputElement).value;
  const category = (form.querySelector("#taskCategory") as HTMLSelectElement)
    .value;

  if (title.trim()) {
    const allTasks: ITask[] = [];
    (UserService.getAllUsers() as User[]).forEach((u) => allTasks.push(...u.getTasks()));
    const newId = getLastId(allTasks) + 1;
    const newTask = addNewUserTask(newId, user);
    user.createTask(newTask);
    // Atualizar exibição
    showUserTask(user, user.getTasks() as Task[]);
    // Fechar modal
    const modal = document.getElementById("modalUserTaskForm") as HTMLElement;
    if (modal) modal.style.display = "none";
    form.reset();
  } else {
    showInfoBanner("Preencha o título da tarefa.", "error-banner");
  }
};
