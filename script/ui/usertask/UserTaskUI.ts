import User from "../../models/user/User.js";
import { gestUserTask } from "../gestUserTask/GestUserUI.js";
import IUser from "../../models/user/IUser.js";

/* Função principal para carregar tarefas do utilizador */
export default function loadUserTask(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const userParam = urlParams.get("user");
  console.log(userParam?.toString());

  const userNameHeader = document.querySelector(
    "#userNameTaskHeader"
  ) as HTMLSpanElement;

  if (userParam) {
    //converter de volta para objeto User
    const user: User = JSON.parse(userParam);

    if (user) {
      userNameHeader.textContent = user.name;
    } else {
      userNameHeader.textContent = "Utilizador Desconhecido";
    }
  } else {
    userNameHeader.textContent = "ID não existe";
  }
}
