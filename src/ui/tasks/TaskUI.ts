import { createSection } from "../dom/index.js";
import { ITask } from "../../tasks/index.js";
import { UserService } from "../../services/index.js";

/* Container de tarefas */
const taskContainer = createSection("taskContainer") as HTMLElement;

/* Função de renderização de todas as tarefas */
export function renderAllTasks(taskList: ITask[]): HTMLElement {
  taskContainer.innerHTML = "";
  const table = createTable();

  const caption = createTableCaption();
  table.appendChild(caption);

  const thead = createTableHeader();
  table.appendChild(thead);

  const tbody = createTableBody();

  taskList.forEach((task) => {
    const row = createTableRow(task as ITask);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  taskContainer.appendChild(table);

  return taskContainer;
}

/* Função para criar uma tabela */
function createTable(): HTMLTableElement {
  const table = document.createElement("table");
  table.id = "taskTable";
  return table;
}

/* Função para criar a legenda da tabela */
function createTableCaption(): HTMLTableCaptionElement {
  const caption = document.createElement("caption");
  caption.textContent = "Lista de Tarefas de todos os utilizadores";
  return caption;
}

/* Função para criar o cabeçalho da tabela */
function createTableHeader(): HTMLTableSectionElement {
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = [
    "ID",
    "Titulo",
    "Estado",
    "Data de Conclusão",
    "Categoria",
    "Utilizador",
  ];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  return thead;
}

/* Função para criar o corpo da tabela */
function createTableBody(): HTMLTableSectionElement {
  const tbody = document.createElement("tbody");
  return tbody;
}

function createTableRow(task: ITask): HTMLTableRowElement {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${task.getId()}</td>
    <td>${task.getTitle()}</td>
    <td>${task.getCompleted() ? "Concluído" : "Pendente"}</td>
    <td>${
      task.getCompletedDate()
        ? task.getCompletedDate().toLocaleString("pt-PT")
        : "N/A"
    }</td>
    <td>${task.getTaskCategory()}</td>
  `;

  const userCell = document.createElement("td");
  const user = task.getUser();
  if (user !== null && user !== undefined) {
    userCell.textContent = user.getName();
  } else {
    const select = createUnassignedUserSelect();
    userCell.appendChild(select);
  }
  row.appendChild(userCell);

  return row;
}

function createUnassignedUserSelect(): HTMLSelectElement {
  const select = document.createElement("select");
  select.className = "user-assignment-select";

  UserService.getAllUsers().forEach((user) => {
    if (user.getTasks().length === 0) {
      const option = document.createElement("option");
      option.value = user.getId().toString();
      option.textContent = user.getName();
      select.appendChild(option);
    }
  });

  return select;
}
