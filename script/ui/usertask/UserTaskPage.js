import { addElementInContainer, } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import showUserTask from "./UserTaskUI.js";
import { removeCompletedTasks } from "./UserTaskCRUD.js";
/* Página de tarefas de um utilizador específico */
export default function loadUserTaskPage(gestUserTask, user) {
    // Adicionar título
    addElementInContainer(createHeadingTitle("h2", `TAREFAS DE ${user.name.toUpperCase()}`));
    // Adicionar contadores
    const countersSection = createUserTaskCounters();
    addElementInContainer(countersSection);
    // Container para tarefas
    const taskContainer = createSection("usersTaskContainer");
    addElementInContainer(taskContainer);
    // Atualizar contadores e mostrar tarefas
    showUserTask(user, user.tasks);
    // Mostrar tarefas
    showUserTask(user, user.tasks);
    // Configurar botão para abrir modal
    setupAddTaskButton(user);
}
/* Criar seção de contadores */
function createUserTaskCounters() {
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
function createAddTaskForm(user, gestUserTask) {
    const form = createSection("addTaskForm");
    form.innerHTML = `
    <button id="addTaskUserBtn">Adicionar Tarefa</button>
  `;
    return form;
}
/* Configurar botão para abrir modal */
function setupAddTaskButton(user) {
    const btn = document.querySelector("#addTaskUserBtn");
    const modal = document.querySelector("#modalUserTaskForm");
    if (btn && modal) {
        btn.onclick = () => {
            modal.style.display = "block";
        };
    }
    // Event listener para remover concluídas
    const removeBtn = document.querySelector("#removeCompletedTaskBtn");
    if (removeBtn) {
        removeBtn.addEventListener("click", () => {
            removeCompletedTasks(user);
        });
    }
}
