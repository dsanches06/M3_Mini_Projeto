import { addNewUserTask } from "./UserTaskCRUD.js";
import showUserTask from "./UserTaskUI.js";
import { getLastId } from "../../helpers/getLastID.js";
import User from "../../models/user/User.js";
import Task from "../../models/task/Task.js";
import ITask from "../../models/task/ITask.js";
import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import { showInfoBanner } from "../../helpers/infoBanner.js";

/**
 * 1. Função para criar e montar o formulário no DOM
 */
export default function createAndAppendTaskForm(
  containerId: string,
  user: User,
  gestUserTask: GestUserTask,
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
    handleFormSubmit(e, user, gestUserTask),
  );
}

/**
 * 2. Função para processar os dados
 */
const handleFormSubmit = (
  event: Event,
  user: User,
  gestUserTask: GestUserTask,
): void => {
  event.preventDefault();

  // Usamos querySelector dentro do target para garantir que pegamos os elementos deste formulário
  const form = event.currentTarget as HTMLFormElement;
  const title = (form.querySelector("#titleInput") as HTMLInputElement).value;
  const category = (form.querySelector("#taskCategory") as HTMLSelectElement)
    .value;

  if (title.trim()) {
    const allTasks: ITask[] = [];
    (gestUserTask.users as User[]).forEach((u) => allTasks.push(...u.tasks));
    const newId = getLastId(allTasks) + 1;
    const newTask = addNewUserTask(newId, user);
    user.createTask(newTask);
    // Atualizar exibição
    showUserTask(user, user.tasks as Task[]);
    // Fechar modal
    const modal = document.getElementById("modalUserTaskForm") as HTMLElement;
    if (modal) modal.style.display = "none";
    form.reset();
  } else {
    showInfoBanner("Preencha o título da tarefa.", "error-banner");
  }
};
