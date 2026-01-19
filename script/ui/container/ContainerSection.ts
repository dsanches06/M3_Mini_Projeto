//main container
const containerSection = document.querySelector(
  "#containerSection"
) as HTMLElement;

/* Funções para manipular o container principal */
export function adicionarElementoNoContainer(element: HTMLElement): void {
  containerSection.appendChild(element);
}

/* Função para limpar o container principal */
export function limparContainer(): void {
  containerSection.innerHTML = "";
}
