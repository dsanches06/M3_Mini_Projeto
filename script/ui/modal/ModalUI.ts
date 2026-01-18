/* Função para abrir o modal de formulario */
export function openFormModal(id: string) {
  const modalForm = document.querySelector(`#${id}`) as HTMLElement;
  if (modalForm) {
    modalForm.style.display = "flex";
    closeModal(modalForm, id);
  } else {
    console.error("Modal form not found");
  }
}
/* Função para fechar o modal */
export function closeModal(modal: HTMLElement, id: string): void {
  const closeBtn = modal.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal.id === id) {
        modal.style.display = "none";
      } else {
        modal.remove();
      }
    });
  }
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      if (modal.id === id) {
        modal.style.display = "none";
      } else {
        modal.remove();
      }
    }
  });
}
