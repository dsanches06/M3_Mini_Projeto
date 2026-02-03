import { IUser } from "../../models/index.js";
import { ITask } from "../../tasks/index.js";
import { UserService, AssignmentService } from "../../services/index.js";
import { GlobalValidators } from "../../utils/index.js";
import {
  createButton,
  createForm,
  createHeadingTitle,
  createSection,
} from "../dom/index.js";
import { showInfoBanner } from "../../helpers/index.js";
import { TaskService } from "../../services/index.js";
import { showUserTask, showUserTasksCounters } from "../usertask/index.js";

/**
 * Configuração da lógica do formulário de atribuição de tarefa
 */
function setupUserAssignTaskFormLogic(
  form: HTMLFormElement,
  fields: {
    task: HTMLSelectElement;
  },
  errors: {
    tasksErr: HTMLElement;
    banner: HTMLElement;
  },
  modal: HTMLElement,
  user: IUser,
): void {
  form.onsubmit = (e: Event) => {
    e.preventDefault();

    // Obter o valor do campo de utilizador
    const taskId: string = fields.task.value;

    // Reset de estados
    errors.tasksErr.textContent = "";
    errors.banner.style.display = "none";

    let isValid = true;

    // Validação do utilizador
    if (!GlobalValidators.isNonEmpty(taskId.trim())) {
      errors.tasksErr.textContent = "Deve selecionar uma tarefa.";
      isValid = false;
    }

    // Verificação Final
    if (isValid && taskId) {
      try {
        const taskIdNum = parseInt(taskId);
        const task = TaskService.getTaskById(taskIdNum);

        if (task) {
          // Atribuir a tarefa ao utilizador
          AssignmentService.assignUser(task.getId(), user.getId());
          
          // Atualizar o utilizador com as tarefas mais recentes
          const updatedUser = UserService.getUserById(user.getId());
          
          showInfoBanner(
            `A tarefa "${task.getTitle()}" foi atribuída ao utilizador "${user.getName()}" com sucesso.`,
            "info-banner",
          );

          // Atualizar a visualização das tarefas
          if (updatedUser) {
            showUserTask(updatedUser, updatedUser.getTasks());
            showUserTasksCounters(updatedUser.getTasks());
          }

          modal.remove();
        } else {
          errors.banner.textContent = "ERRO: Tarefa não encontrada.";
          errors.banner.style.display = "block";
        }
      } catch (error) {
        errors.banner.textContent =
          "ERRO: Ocorreu um problema ao atribuir a tarefa.";
        errors.banner.style.display = "block";
      }
    } else {
      errors.banner.textContent =
        "Existem erros no formulário. Por favor, verifique os campos.";
      errors.banner.style.display = "block";
    }
  };
}

/**
 * Função Principal: Monta o Modal de Atribuição de Tarefa no DOM
 */
export function renderModalUserAssignTask(user: IUser): void {
  // Criar o modal
  const modal = createSection("modalUserAssignTask") as HTMLElement;
  modal.classList.add("modal");

  // Criar o conteúdo do modal
  const content = createSection("modalUserAssignTaskContent") as HTMLElement;
  content.classList.add("modal-content");

  // Criar o botão de fechar
  const closeBtn = document.createElement("span") as HTMLSpanElement;
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => modal.remove();

  // Criar o título
  const titleHeading = createHeadingTitle(
    "h2",
    `Atribuir Tarefa ao Utilizador ${user.getName()}`,
  ) as HTMLHeadingElement;

  // Criar a área de mensagens de erro
  const errorBanner = createSection("section") as HTMLElement;
  errorBanner.classList.add("error-banner");
  errorBanner.style.display = "none";

  // Criar o formulário
  const form = createForm("formUserAssignTask") as HTMLFormElement;

  // Obter todos os utilizadores activos
  const tasks: ITask[] = TaskService.getTasksUnassign();

  // Criar o campo de seleção de utilizador com valores de ID
  const taskSelectContainer = document.createElement("section");
  taskSelectContainer.className = "form-group";

  const taskLabel = document.createElement("label");
  taskLabel.htmlFor = "taskSelect";

  const taskSelect = document.createElement("select");
  taskSelect.id = "taskSelect";
  // Opção padrão
  const defaultOption = document.createElement("option");
  taskSelect.appendChild(defaultOption);

  if (tasks.length === 0) {
    defaultOption.textContent = "N/A";
  } else {
    defaultOption.textContent = "Escolha uma tarefa";
    // Adicionar as opções das tarefas
    tasks.forEach((task) => {
      const option = document.createElement("option");
      option.value = task.getId().toString();
      option.textContent = `${task.getTitle()} [ID: ${task.getId()}]`;
      taskSelect.appendChild(option);
    });
  }

  const taskErr = document.createElement("section");
  taskErr.id = "taskSelectError";
  taskErr.className = "error-message";

  taskSelectContainer.append(taskLabel, taskSelect, taskErr);

  // Criar o botão de submissão
  const submitBtn = createButton(
    "buttonUserAssignTask",
    "Atribuir Tarefa",
    "submit",
  ) as HTMLButtonElement;

  // Adicionar elementos ao formulário
  form.append(taskSelectContainer, submitBtn);

  // Adicionar elementos ao conteúdo do modal
  content.append(closeBtn, titleHeading, errorBanner, form);

  // Adicionar o conteúdo ao modal
  modal.append(content);

  // Adicionar o modal ao documento
  document.body.appendChild(modal);

  // Ligar a lógica ao formulário
  setupUserAssignTaskFormLogic(
    form,
    {
      task: taskSelect,
    },
    {
      tasksErr: taskErr,
      banner: errorBanner,
    },
    modal,
    user,
  );

  // Fechar ao clicar fora do modal
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  modal.style.display = "flex";
}
