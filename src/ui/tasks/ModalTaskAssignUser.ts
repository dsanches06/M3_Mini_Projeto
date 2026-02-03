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
import { renderAllTasks, showTasksCounters } from "../tasks/index.js";
import { TaskService } from "../../services/index.js";

/**
 * Configuração da lógica do formulário de atribuição de tarefa
 */
function setupTaskAssignUserFormLogic(
  form: HTMLFormElement,
  fields: {
    user: HTMLSelectElement;
  },
  errors: {
    userErr: HTMLElement;
    banner: HTMLElement;
  },
  modal: HTMLElement,
  task: ITask,
): void {
  form.onsubmit = (e: Event) => {
    e.preventDefault();

    // Obter o valor do campo de utilizador
    const userId: string = fields.user.value;

    // Reset de estados
    errors.userErr.textContent = "";
    errors.banner.style.display = "none";

    let isValid = true;

    // Validação do utilizador
    if (!GlobalValidators.isNonEmpty(userId.trim())) {
      errors.userErr.textContent = "Deve selecionar um utilizador.";
      isValid = false;
    }

    // Verificação Final
    if (isValid && userId) {
      try {
        const userIdNum = parseInt(userId);
        const user = UserService.getUserById(userIdNum);

        if (user) {
          // Atribuir a tarefa ao utilizador
          AssignmentService.assignUser(task.getId(), userIdNum);

          showInfoBanner(
            `A tarefa "${task.getTitle()}" foi atribuída ao utilizador "${user.getName()}" com sucesso.`,
            "info-banner",
          );

          // Atualizar a visualização das tarefas
          renderAllTasks(TaskService.getAllTasks());
          showTasksCounters(TaskService.getAllTasks());

          modal.remove();
        } else {
          errors.banner.textContent = "ERRO: Utilizador não encontrado.";
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
export function renderModalAssignUser(task: ITask): void {
  // Criar o modal
  const modal = createSection("modalAssignUser") as HTMLElement;
  modal.classList.add("modal");

  // Criar o conteúdo do modal
  const content = createSection("modalAssignUserContent") as HTMLElement;
  content.classList.add("modal-content");

  // Criar o botão de fechar
  const closeBtn = document.createElement("span") as HTMLSpanElement;
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => modal.remove();

  // Criar o título
  const titleHeading = createHeadingTitle(
    "h2",
    `Atribuir ${task.getTitle()}`,
  ) as HTMLHeadingElement;

  // Criar a área de mensagens de erro
  const errorBanner = createSection("section") as HTMLElement;
  errorBanner.classList.add("error-banner");
  errorBanner.style.display = "none";

  // Criar o formulário
  const form = createForm("formAssignUser") as HTMLFormElement;

  // Obter todos os utilizadores activos
  const users: IUser[] = UserService.getAllUsers().filter((user) =>
    user.isActive(),
  );

  // Criar o campo de seleção de utilizador com valores de ID
  const userSelectContainer = document.createElement("section");
  userSelectContainer.className = "form-group";

  const userLabel = document.createElement("label");
  userLabel.htmlFor = "userSelect";

  const userSelect = document.createElement("select");
  userSelect.id = "userSelect";

  // Opção padrão
  const defaultOption = document.createElement("option");
  userSelect.appendChild(defaultOption);

  if (users.length === 0) {
    defaultOption.textContent = "N/A";
  } else {
    defaultOption.textContent = "Escolha um utilizador";
    // Adicionar as opções dos utilizadores
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.getId().toString();
      option.textContent = `${user.getName()} [ID: ${user.getId()}]`;
      userSelect.appendChild(option);
    });
  }

  const userErr = document.createElement("section");
  userErr.id = "userSelectError";
  userErr.className = "error-message";

  userSelectContainer.append(userLabel, userSelect, userErr);

  // Criar o botão de submissão
  const submitBtn = createButton(
    "buttonAssignUser",
    "Atribuir Tarefa",
    "submit",
  ) as HTMLButtonElement;

  // Adicionar elementos ao formulário
  form.append(userSelectContainer, submitBtn);

  // Adicionar elementos ao conteúdo do modal
  content.append(closeBtn, titleHeading, errorBanner, form);

  // Adicionar o conteúdo ao modal
  modal.append(content);

  // Adicionar o modal ao documento
  document.body.appendChild(modal);

  // Ligar a lógica ao formulário
  setupTaskAssignUserFormLogic(
    form,
    {
      user: userSelect,
    },
    {
      userErr: userErr,
      banner: errorBanner,
    },
    modal,
    task,
  );

  // Fechar ao clicar fora do modal
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  modal.style.display = "flex";
}
