import {
  ITask,
  BugTask,
  TaskCategory,
  FeatureTask,
  Task,
} from "../../tasks/index.js";
import { IUser } from "../../models/index.js";
import { GlobalValidators, IdGenerator } from "../../utils/index.js";
import { renderAllTasks, showTasksCounters } from "../task/index.js";
import { TaskService } from "../../services/index.js";

import {
  createButton,
  createForm,
  createHeadingTitle,
  createInputGroup,
  createSection,
  createSelectGroup,
} from "../../ui/dom/index.js";
import { showInfoBanner } from "../../helpers/index.js";
import { showUserTask } from "../../ui/usertask/index.js";

function setupTaskFormLogic(
  form: HTMLFormElement,
  fields: {
    title: HTMLInputElement;
    category: HTMLSelectElement;
    type: HTMLSelectElement;
  },
  errors: {
    titleErr: HTMLElement;
    categoryErr: HTMLElement;
    typeErr: HTMLElement;
    banner: HTMLElement;
  },
  modal: HTMLElement,
  user?: IUser,
): void {
  form.onsubmit = (e: Event) => {
    e.preventDefault();

    //obter os valores dos campos
    const title: string = fields.title.value;
    const category: string = fields.category.value;
    const type: string = fields.type.value;

    // Reset de estados
    errors.titleErr.textContent = "";
    errors.categoryErr.textContent = "";
    errors.typeErr.textContent = "";
    errors.banner.style.display = "none";

    let isValid = true;

    if (GlobalValidators.minLength(title, 3)) {
      errors.titleErr.textContent =
        "O titulo deve ter pelo menos 3 caracteres.";
      isValid = false;
    }

    if (GlobalValidators.isNonEmpty(title.trim())) {
      errors.titleErr.textContent = "O nome não pode estar vazio.";
      isValid = false;
    }

    if (!GlobalValidators.isNonEmpty(category.trim())) {
      errors.categoryErr.textContent = "A categoria não pode estar vazio.";
      isValid = false;
    }

    if (!GlobalValidators.isNonEmpty(type.trim())) {
      errors.typeErr.textContent = "O tipo não pode estar vazio.";
      isValid = false;
    }
    let newTask: ITask | undefined;
    let taskCategory: TaskCategory = TaskCategory.PERSONAL;
    // Verificação Final
    if (isValid) {
      //obter a cetagoria
      if (category) {
        if (category === "Trabalho") {
          taskCategory = TaskCategory.WORKED;
        } else if (category === "Pessoal") {
          taskCategory = TaskCategory.PERSONAL;
        } else if (category === "Estudo") {
          taskCategory = TaskCategory.STUDY;
        }
      }
      //obter um novo id a partir do ultimo
      let newId: number = IdGenerator.generate();
      //obter o tipo de task a criar
      if (type.trim() === "Bugs") {
        newTask = new BugTask(newId, title, taskCategory);
      } else if (type.trim() === "Feature") {
        newTask = new FeatureTask(newId, title, taskCategory);
      } else if (type.trim() === "Task") {
        newTask = new Task(newId, title, taskCategory);
      }

      if (newTask) {
        TaskService.addTask(newTask);
        showInfoBanner(
          `A tarefa ${newTask.getTitle()} foi adicionada com sucesso.`,
          "info-banner",
        );
        renderAllTasks(TaskService.getAllTasks());
        showTasksCounters("all", TaskService.getAllTasks());
      } else if (user && newTask) {
        user.createTask(newTask);
        showInfoBanner(
          `A tarefa ${(newTask as ITask).getTitle()} foi adicionada ao utilizador ${user.getName()} com sucesso.`,
          "info-banner",
        );
        //mostra todos os utilizadores
        showUserTask(user, user.getTasks());
        showTasksCounters("all", user.getTasks());
      } else {
        showInfoBanner(
          `ERRO: A tarefa ${title} não foi adicionada.`,
          "error-banner",
        );
      }
      modal.remove();
    } else {
      errors.banner.textContent =
        "Existem erros no formulário. Por favor, verifique os campos.";
      errors.banner.style.display = "block";
    }
  };
}

/**
 *  Função Principal: Monta o Modal no DOM
 */
export function renderModal(user?: IUser): void {
  const modal = createSection("modalForm") as HTMLElement;
  modal.classList.add("modal");

  const content = createSection("modalContent") as HTMLElement;
  content.classList.add("modal-content");

  const closeBtn = document.createElement("span") as HTMLSpanElement;
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => modal.remove();

  const titleHeading = createHeadingTitle(
    "h2",
    "Adicionar Novo Task",
  ) as HTMLHeadingElement;

  const errorBanner = createSection("section") as HTMLElement;
  errorBanner.classList.add("error-banner");
  errorBanner.style.display = "none";

  const form = createForm("formTask") as HTMLFormElement;

  // Criação dos campos usando a função auxiliar
  const titleData = createInputGroup(
    "Titulo",
    "TitleInput",
    "text",
    "inserir o titulo da tarefa",
  );
  const taskCategory = ["Trabalho", "Pessoal", "Estudo"];
  const categoryData = createSelectGroup("Cargo", "userRole", taskCategory);

  const taskType = ["Bugs", "Feature", "Task"];
  const TypeData = createSelectGroup("Tipo", "userRole", taskType);

  const submitBtn = createButton(
    "button",
    "Adicionar",
    "submit",
  ) as HTMLButtonElement;

  form.append(
    titleData.section,
    categoryData.section,
    TypeData.section,
    submitBtn,
  );
  content.append(closeBtn, titleHeading, errorBanner, form);
  modal.append(content);
  document.body.appendChild(modal);

  // Ligar a lógica ao formulário
  setupTaskFormLogic(
    form,
    {
      title: titleData.input,
      category: categoryData.select,
      type: TypeData.select,
    },
    {
      titleErr: titleData.errorSection,
      categoryErr: categoryData.errorSection,
      typeErr: TypeData.errorSection,
      banner: errorBanner,
    },
    modal,
    user,
  );

  // Fechar ao clicar fora
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  modal.style.display = "block";
}
