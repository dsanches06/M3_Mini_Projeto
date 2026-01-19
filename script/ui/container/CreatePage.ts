/* Função para criar um título de página (elemento h2) */
export function createHeadingTitle(title: string): HTMLHeadingElement {
  const titleElement = document.createElement("h2") as HTMLHeadingElement;
  titleElement.textContent = title;
  return titleElement;
}

/* Função para criar uma seção (elemento section) */
export function createSection(id: string): HTMLElement {
  const section = document.createElement("section") as HTMLElement;
  section.id = id;
  return section;
}

/* Função para criar uma figura com imagem e legenda */
export function createFigureWithImage(
  id: string,
  alt: string,
  src: string,
  captionText?: string
): HTMLElement {
  //criar a figura
  const figure = document.createElement("figure") as HTMLElement;
  figure.id = id;
  //criar a imagem
  const img = document.createElement("img") as HTMLImageElement;
  img.id = id;
  img.alt = alt;
  img.src = src;
  img.role = "button";
  img.tabIndex = 0;
  figure.appendChild(img);
  //se houver legenda, criar o figcaption
  if (captionText) {
    const figCaption = document.createElement("figcaption") as HTMLElement;
    figCaption.textContent = captionText;
    figure.appendChild(figCaption);
  } //retornar a figura
  return figure;
}

/* Função para criar um formulário (elemento form) */
export function createForm(id: string): HTMLFormElement {
  const form = document.createElement("form") as HTMLFormElement;
  form.id = id;
  return form;
}

/* Função para criar um rótulo (elemento label) */
export function createLabel(id: string, htmlFor: string): HTMLLabelElement {
  const label = document.createElement("label") as HTMLLabelElement;
  label.id = id;
  label.htmlFor = htmlFor;
  return label;
}

/* Função para criar um input (elemento input) */
export function createInput(id: string, type: string) {
  const input = document.createElement("input") as HTMLInputElement;
  input.type = type;
  input.id = id;
  return input;
}

/* Função para criar um select (elemento select) */
export function createSelect(id: string): HTMLSelectElement {
  const select = document.createElement("select") as HTMLSelectElement;
  select.id = id;
  return select;
}

/* Função para criar uma option (elemento option) */
export function createOption(value: string): HTMLOptionElement {
  const option = document.createElement("option") as HTMLOptionElement;
  option.text = value;
  option.value = value;
  return option;
}

/* Função para criar um botão (elemento button) */
export function createButton(
  id: string,
  text: string,
  type: "submit" | "reset" | "button"
): HTMLButtonElement {
  const button = document.createElement("button") as HTMLButtonElement;
  button.id = id;
  button.textContent = text;
  button.type = type;
  return button;
}
