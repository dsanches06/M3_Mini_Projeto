/* Função principal para carregar tarefas do utilizador */
export default function loadUserTask() {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");
    console.log(userParam === null || userParam === void 0 ? void 0 : userParam.toString());
    const userNameHeader = document.querySelector("#userNameTaskHeader");
    if (userParam) {
        //converter de volta para objeto User
        const user = JSON.parse(userParam);
        if (user) {
            userNameHeader.textContent = user.name;
        }
        else {
            userNameHeader.textContent = "Utilizador Desconhecido";
        }
    }
    else {
        userNameHeader.textContent = "ID não existe";
    }
}
