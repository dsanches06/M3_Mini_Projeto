//main container
const containerSection = document.querySelector("#containerSection");
/* Funções para manipular o container principal */
export function adicionarElementoNoContainer(element) {
    containerSection.appendChild(element);
}
/* Função para limpar o container principal */
export function limparContainer() {
    containerSection.innerHTML = "";
}
