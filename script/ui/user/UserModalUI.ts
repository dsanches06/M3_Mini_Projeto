import User from "../../models/user/User.js";

/* Função para abrir o modal de formulario */
export function openFormModal() {
  const modalForm = document.querySelector("#modalForm") as HTMLDivElement;
  if (modalForm) {
    modalForm.style.display = "flex";
    closeModal(modalForm);
  } else {
    console.error("Modal form not found");
  }
}

/* Função para fechar o modal */
export function closeModal(modal: HTMLDivElement) {
  const closeBtn = modal.querySelector(".close") as HTMLSpanElement;
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal.id === "modalForm") {
        modal.style.display = "none";
      } else {
        modal.remove();
      }
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      if (modal.id === "modalForm") {
        modal.style.display = "none";
      } else {
        modal.remove();
      }
    }
  });
}

/* Função que cria o modal para mostrar detalhes do tulizador */
export function modalUserDetail(user: User): HTMLDivElement {
  const title = document.createElement("h3") as HTMLHeadingElement;
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

  const userDetails = document.createElement("div") as HTMLDivElement;
  userDetails.appendChild(title);
  userDetails.appendChild(detailId);
  userDetails.appendChild(detailName);
  userDetails.appendChild(detailEmail);
  userDetails.appendChild(detailStatus);

  return userDetails;
}

/* Modal para visualização de detalhes do utilizador */
export function showUserDetails(user: User) {
  const modal = document.createElement("div") as HTMLDivElement;
  modal.className = "modal";
  modal.style.display = "flex";

  const modalContent = document.createElement("div") as HTMLDivElement;
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
  closeModal(modal);
}
