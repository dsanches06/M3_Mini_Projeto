import { ITask } from "../../tasks/index.js";
import { TaskStatus } from "../../tasks/TaskStatus.js";
import {
  UserService,
  TaskService,
  AssignmentService,
} from "../../services/index.js";
import { GlobalValidators } from "../../utils/index.js";
import {
  createButton,
  createForm,
  createHeadingTitle,
  createSection,
  createInputGroup,
} from "../dom/index.js";
import { showInfoBanner } from "../../helpers/index.js";
import { renderDashboard } from "./index.js";

function setupEditTaskFormLogic(
  form: HTMLFormElement,
  fields: {
    title: HTMLInputElement;
    status: HTMLSelectElement;
    user: HTMLSelectElement;
  },
  errors: {
    titleErr: HTMLElement;
  },
  modal: HTMLElement,
  task: ITask,
): void {
  form.onsubmit = (e: Event) => {
    e.preventDefault();

    const title = fields.title.value.trim();
    const statusValue = fields.status.value as keyof typeof TaskStatus;
    const userValue = fields.user.value;

    errors.titleErr.textContent = "";

    let isValid = true;

    if (!GlobalValidators.isNonEmpty(title)) {
      errors.titleErr.textContent = "O título não pode estar vazio.";
      isValid = false;
    }

    if (!GlobalValidators.minLength(title, 3)) {
      errors.titleErr.textContent =
        "O título deve ter pelo menos 3 caracteres.";
      isValid = false;
    }

    if (isValid) {
      if (title !== task.getTitle()) {
        task.setTitle(title);
      }

      const newStatus = (TaskStatus as any)[statusValue] as TaskStatus;
      if (newStatus && newStatus !== task.getStatus()) {
        if (task.getUser()) {
          task.moveTo(newStatus);
        } else {
          showInfoBanner(
            `ERRO: A tarefa "${task.getTitle()}" não pode mudar de status sem estar atribuída a um utilizador.`,
            "error-banner",
          );
          isValid = false;
        }
      }
      let select = document.querySelector(
        "#editTaskStatus",
      ) as HTMLSelectElement;
      if (userValue === "") {
        const currentUser = task.getUser();
        if (currentUser) {
          if (!task.getCompleted()) {
            fields.status.disabled = true;
            AssignmentService.unassignUser(task.getId(), currentUser.getId());
            showInfoBanner(
              `INFO: A tarefa "${task.getTitle()}" foi cancelada do utilizador "${currentUser.getName()}" com sucesso.`,
              "info-banner",
            );
          } else {
            showInfoBanner(
              `ERRO: A tarefa "${task.getTitle()}" não pode ser cancelada pois já está concluída.`,
              "error-banner",
            );
          }
        }
      } else {
        const userId = parseInt(userValue);
        if (!isNaN(userId)) {
          fields.status.disabled = true;
          AssignmentService.assignUser(task.getId(), userId);
          const user = UserService.getUserById(userId);
          showInfoBanner(
            `INFO: A tarefa "${task.getTitle()}" foi atribuída ao utilizador "${user?.getName()}" com sucesso.`,
            "info-banner",
          );
        }
      }
      // Re-renderizar o dashboard com todas as tasks
      renderDashboard(TaskService.getAllTasks());
      modal.remove();
    } else {
      showInfoBanner(
        `ERRO: A tarefa ${title} não foi atualizada. Verifique os erros no formulário.`,
        "error-banner",
      );
    }
  };
}

export function renderModalEditTask(task: ITask): void {
  const modal = createSection("modalEditTask") as HTMLElement;
  modal.classList.add("modal");

  const content = createSection("modalEditTaskContent") as HTMLElement;
  content.classList.add("modal-content");

  const closeBtn = document.createElement("span") as HTMLSpanElement;
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => modal.remove();

  const titleHeading = createHeadingTitle(
    "h2",
    `Editar ${task.getTitle()}`,
  ) as HTMLHeadingElement;

  const errorBanner = createSection("section") as HTMLElement;
  errorBanner.classList.add("error-banner");
  errorBanner.style.display = "none";

  const form = createForm("formEditTask") as HTMLFormElement;

  const titleData = createInputGroup(
    "Titulo",
    "editTaskTitle",
    "text",
    "editar o titulo da tarefa",
  );
  titleData.input.value = task.getTitle();

  // Status select (grouped)
  const statusGroup = document.createElement("section");
  statusGroup.className = "form-group";

  const statusLabel = document.createElement("label");
  statusLabel.htmlFor = "editTaskStatus";
  statusLabel.textContent = "";

  const statusSelect = document.createElement("select") as HTMLSelectElement;
  statusSelect.id = "editTaskStatus";
  const statuses = Object.keys(TaskStatus) as Array<keyof typeof TaskStatus>;
  statuses.forEach((key) => {
    // names are keys in enum; we need to skip numeric keys if any
    if (!isNaN(Number(key as any))) return;
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    if ((TaskStatus as any)[key] === task.getStatus()) {
      option.selected = true;
    }
    statusSelect.appendChild(option);
  });
  statusGroup.append(statusLabel, statusSelect);

  // User select (grouped)
  const userGroup = document.createElement("section");
  userGroup.className = "form-group";

  const userLabel = document.createElement("label");
  userLabel.htmlFor = "editTaskUser";
  userLabel.textContent = "";

  const userSelect = document.createElement("select") as HTMLSelectElement;
  userSelect.id = "editTaskUser";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Nenhum";
  userSelect.appendChild(defaultOption);

  const users = UserService.getAllUsers().filter((u) => u.isActive());
  users.forEach((user) => {
    const opt = document.createElement("option");
    opt.value = user.getId().toString();
    opt.textContent = `${user.getName()} [ID: ${user.getId()}]`;
    if (task.getUser() && task.getUser()!.getId() === user.getId())
      opt.selected = true;
    userSelect.appendChild(opt);
  });
  userGroup.append(userLabel, userSelect);

  const submitBtn = createButton(
    "buttonEditTask",
    "Guardar",
    "submit",
  ) as HTMLButtonElement;

  form.append(titleData.section, statusGroup, userGroup, submitBtn);
  content.append(closeBtn, titleHeading, errorBanner, form);
  modal.append(content);

  document.body.appendChild(modal);

  setupEditTaskFormLogic(
    form,
    {
      title: titleData.input,
      status: statusSelect,
      user: userSelect,
    },
    {
      titleErr: titleData.errorSection,
    },
    modal,
    task,
  );

  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  modal.style.display = "flex";
}
