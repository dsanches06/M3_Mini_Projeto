import Task from "../../models/task/Task.js";
import {
  countAllUserTasks,
  countPendingUserTasks,
  countCompletedUserTasks,
} from "./TaskCounters.js";

/* Container de tarefas */
const taskContainer = document.querySelector(
  "#taskContainer",
) as HTMLDivElement;

/* Mostrar tarefas */
export default function showTask(taskList: Task[]): void {
  renderTask(taskList);
  countAllUserTasks(taskList);
  countPendingUserTasks(taskList);
  countCompletedUserTasks(taskList);
}

/* Função de renderização de todas as tarefas */
function renderTask(taskList: Task[]): void {
  if (taskContainer) {
    taskContainer.innerHTML = "";
    const table = createTable();

    const caption = createTableCaption();
    table.appendChild(caption);

    const thead = createTableHeader();
    table.appendChild(thead);

    const tbody = createTableBody();

    taskList.forEach((task) => {
      const row = createTableRow(task as Task);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    taskContainer.appendChild(table);
  } else {
    console.warn("Elemento #taskContainer não foi renderizado no DOM.");
  }
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

// Ajuste a sua função de criação para retornar apenas a TR
function createTableRow(task: Task): HTMLTableRowElement {
  const row = document.createElement("tr");
  row.innerHTML = `
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${task.completed ? "Concluído" : "Pendente"}</td>
                <td>${
                  task.completeDate
                    ? task.completeDate.toLocaleString("pt-PT")
                    : "N/A"
                }</td>
                <td>${task.category}</td>
                <td>${task.user.name}</td>
            `;
  return row;
}
