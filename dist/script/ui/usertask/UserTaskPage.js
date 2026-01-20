import { addElementInContainer, clearContainer, } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import showUserTask from "./UserTaskUI.js";
import { getUserIdFromURL, addNewUserTask, removeCompletedTasks } from "./UserTaskCRUD.js";
import { getLastId } from "../../helpers/getLastID.js";
/* Página de tarefas de um utilizador específico */
export default function loadUserTaskPage(gestUserTask) {
    /* ativa o menu (assumindo que há um menu para tarefas do usuário, ou nenhum) */
    // menuSelected("#menuUserTasks"); // Se houver
    // Obter o ID do usuário da URL
    const userId = getUserIdFromURL();
    if (userId === -1) {
        console.error("ID do usuário não encontrado na URL.");
        return;
    }
    // Encontrar o usuário
    const user = gestUserTask.users.find((u) => u.id === userId);
    if (!user) {
        console.error("Usuário não encontrado.");
        return;
    }
    // Limpar container
    clearContainer();
    // Adicionar título
    addElementInContainer(createHeadingTitle("h2", `TAREFAS DE ${user.name.toUpperCase()}`));
    // Adicionar contadores
    const countersSection = createUserTaskCounters();
    addElementInContainer(countersSection);
    // Atualizar contadores
    showUserTask(user, user.tasks);
    // Adicionar formulário para nova tarefa
    const addTaskForm = createAddTaskForm(user, gestUserTask);
    addElementInContainer(addTaskForm);
    // Container para tarefas
    const taskContainer = createSection("usersTaskContainer");
    addElementInContainer(taskContainer);
    // Mostrar tarefas
    showUserTask(user, user.tasks);
    // Configurar modal
    setupModal(user, gestUserTask);
}
/* Criar seção de contadores */
function createUserTaskCounters() {
    const counters = createSection("userTaskCounters");
    counters.innerHTML = `
    <div>Total: <span id="totalTasks">0</span></div>
    <div>Pendentes: <span id="pendingTasks">0</span></div>
    <div>Concluídas: <span id="completedTasks">0</span></div>
    <button id="removeCompletedBtn">Remover Concluídas</button>
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
/* Configurar modal */
function setupModal(user, gestUserTask) {
    const modal = document.querySelector("#modalUserTaskForm");
    const btn = document.querySelector("#addTaskUserBtn");
    const span = modal.querySelector(".close");
    const form = modal.querySelector("#formTaskUser");
    // Abrir modal
    btn.onclick = () => {
        modal.style.display = "block";
    };
    // Fechar modal
    span.onclick = () => {
        modal.style.display = "none";
    };
    // Quando clicar fora
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    // Submeter formulário
    form.onsubmit = (e) => {
        e.preventDefault();
        const titleInput = form.querySelector("#titleInput");
        const categorySelect = form.querySelector("#taskCategory");
        if (titleInput.value.trim() && categorySelect.value) {
            const allTasks = [];
            gestUserTask.users.forEach(user => allTasks.push(...user.tasks));
            const newId = getLastId(allTasks) + 1;
            const newTask = addNewUserTask(newId, user);
            user.createTask(newTask);
            // Atualizar exibição
            showUserTask(user, user.tasks);
            // Fechar modal
            modal.style.display = "none";
            // Limpar formulário
            titleInput.value = "";
            categorySelect.value = "Trabalho"; // Reset
        }
        else {
            alert("Preencha todos os campos.");
        }
    };
    // Event listener para remover concluídas
    const removeBtn = document.querySelector("#removeCompletedTaskBtn");
    removeBtn.addEventListener("click", () => {
        removeCompletedTasks(user);
    });
}
