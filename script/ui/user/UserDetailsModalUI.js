/* Modal para visualização de detalhes do utilizador */
export function showUserDetails(user) {
    const modal = document.createElement("section");
    modal.id = "modalUserDetails";
    modal.className = "modal";
    modal.style.display = "flex";
    const modalContent = document.createElement("section");
    modalContent.className = "modal-content";
    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.textContent = "×";
    const userDetails = modalUserDetail(user);
    userDetails.id = "userDetails";
    userDetails.className = "user-details";
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(userDetails);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    closeBtn.onclick = () => {
        modal.remove();
    };
}
/* Função que cria o modal para mostrar detalhes do utilizador */
function modalUserDetail(user) {
    const title = document.createElement("h3");
    title.id = "detailTitle";
    title.textContent = "Detalhes do Utilizador";
    const detailName = document.createElement("p");
    detailName.id = "detailName";
    detailName.innerHTML = `<strong>Nome:</strong> ${user.name}`;
    const detailEmail = document.createElement("p");
    detailEmail.id = "detailEmail";
    detailEmail.innerHTML = `<strong>Email:</strong> ${user.email}`;
    const detailId = document.createElement("p");
    detailId.id = "detailId";
    detailId.innerHTML = `<strong>ID:</strong> ${user.id}`;
    const detailStatus = document.createElement("p");
    detailStatus.id = "detailStatus";
    detailStatus.innerHTML = `<strong>Status:</strong> ${user.isAtive ? "Ativo" : "Inativo"}`;
    const userTasksDetails = modalUserTask(user);
    userTasksDetails.className = "user-tasks-details";
    const userDetails = document.createElement("section");
    userDetails.appendChild(title);
    userDetails.appendChild(detailId);
    userDetails.appendChild(detailName);
    userDetails.appendChild(detailEmail);
    userDetails.appendChild(detailStatus);
    userDetails.appendChild(userTasksDetails);
    return userDetails;
}
/* Função que cria o modal para mostrar detalhes do tulizador */
function modalUserTask(user) {
    //cria um subtítulo
    const sectionTitle = document.createElement("h4");
    sectionTitle.className = "detailTasksTitle";
    sectionTitle.textContent = "Tarefas do Utilizador";
    //criar uma lista não ordenada
    const ul = document.createElement("ul");
    //por cada tarefa do utilizador
    user.tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = `${task.title} - ${task.completed ? "Concluído" : "Pendente"} - ${task.category} - ${task.completeDate
            ? task.completeDate.toLocaleDateString("pt-PT", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })
            : "N/A"}`;
        ul.appendChild(li);
    });
    //criar uma nova section
    const section = document.createElement("section");
    section.appendChild(sectionTitle);
    section.appendChild(ul);
    return section;
}
