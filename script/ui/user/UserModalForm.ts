import { getLastId } from "../../helpers/getLastID.js";
import { showInfoBanner } from "../../helpers/infoBanner.js";
import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import {
  createButton,
  createForm,
  createHeadingTitle,
  createSection,
} from "../dom/CreatePage.js";
import { showUsersCounters } from "./UserPage.js";
import renderUsers from "./UserUI.js";

/**
 * . Função Auxiliar: Cria os grupos de input (Label + Input + Erro)
 */
function createInputGroup(
  labelStr: string,
  id: string,
  type: string,
  placeholder: string,
) {
  const section = document.createElement("section");
  section.className = "form-group";

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelStr;

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;

  const errorSection = document.createElement("section");
  errorSection.id = `${id}Error`;
  errorSection.className = "error-message";

  section.append(label, input, errorSection);

  return { section, input, errorSection };
}

/**
 * Gere a submissão e validação com Regex para Email
 */
function setupFormLogic(
  gestUserTask: GestUserTask,
  form: HTMLFormElement,
  fields: { name: HTMLInputElement; email: HTMLInputElement },
  errors: { nameErr: HTMLElement; emailErr: HTMLElement; banner: HTMLElement },
  modal: HTMLElement,
): void {
  form.onsubmit = (e: Event) => {
    e.preventDefault();

    // Reset de estados
    errors.nameErr.textContent = "";
    errors.emailErr.textContent = "";
    errors.banner.style.display = "none";

    let isValid = true;

    // Validação do Nome
    if (fields.name.value.trim().length < 3) {
      errors.nameErr.textContent = "O nome deve ter pelo menos 3 caracteres.";
      isValid = false;
    }

    //  Validação de Email com Regex
    // Esta regex valida: texto + @ + texto + . + extensão (2 ou mais caracteres)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(fields.email.value.trim())) {
      errors.emailErr.textContent =
        "Introduza um endereço de email válido (ex: nome@email.com).";
      isValid = false;
    }

    // Verificação Final
    if (isValid) {
      modal.remove();
      //obter um novo id a partir do ultimo
      let newId: number = getLastId(gestUserTask.users) + 1;
      //cria um novo user com os dados inseridos no formulario
      const user: User = new User(newId, fields.name.value, fields.email.value);
      //adiciona a lista de utilizadores
      gestUserTask.addUser(user);
      showInfoBanner(`${user.name} foi adicionado com sucesso.`, "info-banner");
      //mostra todos os utilizadores
      renderUsers(gestUserTask, gestUserTask.users as User[]);
      // atualizar contadores
      showUsersCounters(gestUserTask.users as User[]);
    } else {
      errors.banner.textContent =
        "Existem erros no formulário. Por favor, verifique os campos.";
      errors.banner.style.display = "block";
    }
  };
}

/**
 *  Função Principal: Monta o Modal no DOM
 */
export function renderUserModal(gestUserTask: GestUserTask): void {
  const modal = createSection("modalUserForm") as HTMLElement;
  modal.classList.add("modal");

  const content = createSection("modalUserContent") as HTMLElement;
  content.classList.add("modal-content");

  const closeBtn = document.createElement("span") as HTMLSpanElement;
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => modal.remove();

  const title = createHeadingTitle(
    "h2",
    "Adicionar Novo Utilizador",
  ) as HTMLHeadingElement;

  const errorBanner = createSection("section") as HTMLElement;
  errorBanner.classList.add("error-banner");
  errorBanner.style.display = "none";

  const form = createForm("formUser") as HTMLFormElement;

  // Criação dos campos usando a função auxiliar
  const nameData = createInputGroup(
    "Nome",
    "nameInput",
    "text",
    "inserir o nome",
  );
  const emailData = createInputGroup(
    "Email",
    "emailInput",
    "email",
    "inserir o email",
  );

  const submitBtn = createButton(
    "button",
    "Adicionar Utilizador",
    "submit",
  ) as HTMLButtonElement;

  // Montagem
  form.append(nameData.section, emailData.section, submitBtn);
  content.append(closeBtn, title, errorBanner, form);
  modal.append(content);
  document.body.appendChild(modal);

  // Ligar a lógica ao formulário
  setupFormLogic(
    gestUserTask,
    form,
    { name: nameData.input, email: emailData.input },
    {
      nameErr: nameData.errorSection,
      emailErr: emailData.errorSection,
      banner: errorBanner,
    },
    modal,
  );

  // Fechar ao clicar fora
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  modal.style.display = "block";
}
