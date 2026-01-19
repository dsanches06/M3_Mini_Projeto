/* Função para criar um título de página (elemento h2) */
export function createHeadingTitle(title) {
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    return titleElement;
}
/* Função para criar uma seção (elemento section) */
export function createSection(id) {
    const section = document.createElement("section");
    section.id = id;
    return section;
}
/* Função para criar uma figura com imagem e legenda */
export function createFigureWithImage(id, alt, src, captionText) {
    //criar a figura
    const figure = document.createElement("figure");
    figure.id = id;
    //criar a imagem
    const img = document.createElement("img");
    img.id = id;
    img.alt = alt;
    img.src = src;
    img.role = "button";
    img.tabIndex = 0;
    figure.appendChild(img);
    //se houver legenda, criar o figcaption
    if (captionText) {
        const figCaption = document.createElement("figcaption");
        figCaption.textContent = captionText;
        figure.appendChild(figCaption);
    } //retornar a figura
    return figure;
}
/* Função para criar um formulário (elemento form) */
export function createForm(id) {
    const form = document.createElement("form");
    form.id = id;
    return form;
}
/* Função para criar um rótulo (elemento label) */
export function createLabel(id, htmlFor) {
    const label = document.createElement("label");
    label.id = id;
    label.htmlFor = htmlFor;
    return label;
}
/* Função para criar um input (elemento input) */
export function createInput(id, type) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    return input;
}
/* Função para criar um select (elemento select) */
export function createSelect(id) {
    const select = document.createElement("select");
    select.id = id;
    return select;
}
/* Função para criar uma option (elemento option) */
export function createOption(value) {
    const option = document.createElement("option");
    option.text = value;
    option.value = value;
    return option;
}
/* Função para criar um botão (elemento button) */
export function createButton(id, text, type) {
    const button = document.createElement("button");
    button.id = id;
    button.textContent = text;
    button.type = type;
    return button;
}
