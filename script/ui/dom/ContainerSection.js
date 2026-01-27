//main container
const containerSection = document.querySelector("#containerSection");
/* Funções para manipular o container principal */
export function addElementInContainer(element) {
    containerSection.appendChild(element);
}
/* Função para limpar o container principal */
export function clearContainer() {
    containerSection.innerHTML = "";
}
console.log(containerSection);
