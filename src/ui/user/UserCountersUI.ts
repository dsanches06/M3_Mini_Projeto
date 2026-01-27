import { IUser } from "../../models/index.js";
import { allUsers } from "../gestUserTask/index.js";

/* Contador de utilizadores ativos */
export function countAtiveUsers(id: string, usersList: IUser[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    let arrayAtiveUsers = usersList.filter((user) => user.isActive());
    section.textContent = `${arrayAtiveUsers.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de utilizadores inativos */
export function countUnableUsers(id: string, usersList: IUser[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    let arrayUnableUsers = usersList.filter((user) => !user.isActive());
    section.textContent = `${arrayUnableUsers.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de utilizadores */
export function countAllUsers(id: string, usersList: IUser[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    section.textContent = `${usersList.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Percentagem de utilizadores ativos */
export function countAtiveInativePercentage(
  id: string,
  usersList: IUser[],
  type?: string,
): void {
  const section = document.querySelector(`${id}`) as HTMLElement;

  if (section) {
    const activeInativeUsers = usersList.length;
    const totalUsers = allUsers().length;
    const percentage =
      totalUsers > 0 ? ((activeInativeUsers / totalUsers) * 100).toFixed(2) : 0;
    section.textContent = `${percentage}%`;
    changeImageAndFigCaption(type!);
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

function changeImageAndFigCaption(type: string) {
  if (type) {
    const ativosPercentangeCaption = document.querySelector(
      "#ativosPercentangeCaption",
    ) as HTMLElement;

    const ativeUsersPercentageBtn = document.querySelector(
      "#ativeUsersPercentageBtn",
    ) as HTMLImageElement;

    if (ativosPercentangeCaption && ativeUsersPercentageBtn) {
      switch (type) {
        case "inactivos":
          ativeUsersPercentageBtn.src = "/src/assets/grafico.png";
          ativosPercentangeCaption.textContent = "inactivos %";
          break;
        case "utilizadores":
        case "activos":
          ativeUsersPercentageBtn.src = "/src/assets/percentagem.png";
          ativosPercentangeCaption.textContent = "activos %";
          break;
        default:
      }
    } else {
      console.warn(`Elemento ativosCaption não foi encontrado no DOM.`);
    }
  }
}
