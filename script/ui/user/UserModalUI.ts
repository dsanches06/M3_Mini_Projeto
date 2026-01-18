import User from "../../models/user/User.js";
import { closeModal } from "../../ui/modal/ModalUI.js";

/* Modal para visualização de detalhes do utilizador */
export function showUserDetails(user: User) {
  const modal = document.createElement("section") as HTMLElement;
  modal.id = "modalUserDetails";
  modal.className = "modal";
  modal.style.display = "flex";

  const modalContent = document.createElement("section") as HTMLElement;
  modalContent.className = "modal-content";

  const closeBtn = document.createElement("span") as HTMLSpanElement;
  closeBtn.className = "close";
  closeBtn.textContent = "×";

  const userDetails = modalUserDetail(user);
  userDetails.id = "userDetails";
  userDetails.className = "user-details";

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(userDetails);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  closeModal(modal, modal.id);
}

/* Função que cria o modal para mostrar detalhes do utilizador */
function modalUserDetail(user: User): HTMLElement {
  const title = document.createElement("h3") as HTMLHeadingElement;
  title.id = "detailTitle";
  title.textContent = "Detalhes do Utilizador";

  const detailName = document.createElement("p") as HTMLParagraphElement;
  detailName.id = "detailName";
  detailName.innerHTML = `<strong>Nome:</strong> ${user.name}`;

  const detailEmail = document.createElement("p") as HTMLParagraphElement;
  detailEmail.id = "detailEmail";
  detailEmail.innerHTML = `<strong>Email:</strong> ${user.email}`;

  const detailId = document.createElement("p") as HTMLParagraphElement;
  detailId.id = "detailId";
  detailId.innerHTML = `<strong>ID:</strong> ${user.id}`;

  const detailStatus = document.createElement("p") as HTMLParagraphElement;
  detailStatus.id = "detailStatus";
  detailStatus.innerHTML = `<strong>Status:</strong> ${
    user.isAtive ? "Ativo" : "Inativo"
  }`;

  const userTasksDetails = modalUserTask(user);
  userTasksDetails.className = "user-tasks-details";

  const userDetails = document.createElement("section") as HTMLElement;
  userDetails.appendChild(title);
  userDetails.appendChild(detailId);
  userDetails.appendChild(detailName);
  userDetails.appendChild(detailEmail);
  userDetails.appendChild(detailStatus);
  userDetails.appendChild(userTasksDetails);

  return userDetails;
}

/* Função que cria o modal para mostrar detalhes do tulizador */
function modalUserTask(user: User): HTMLElement {
  //cria um subtítulo
  const sectionTitle = document.createElement("h4") as HTMLHeadingElement;
  sectionTitle.className = "detailTasksTitle";
  sectionTitle.textContent = "--- Tarefas do Utilizador ---";

  //criar uma lista não ordenada
  const ul = document.createElement("ul") as HTMLUListElement;
  //por cada tarefa do utilizador
  user.tasks.forEach((task) => {
    const li = document.createElement("li") as HTMLLIElement;
    li.textContent = `${task.title} - ${
      task.completed ? "Concluído" : "Pendente"
    } - ${task.category} - ${
      task.completeDate
        ? task.completeDate.toLocaleDateString("pt-PT", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A"
    }`;
    ul.appendChild(li);
  });

  //criar uma nova section
  const section = document.createElement("section") as HTMLElement;
  section.appendChild(sectionTitle);
  section.appendChild(ul);
  return section;
}
