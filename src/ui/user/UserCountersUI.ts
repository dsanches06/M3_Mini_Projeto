import { UserService } from "../../services/index.js";
import { IUser } from "../../models/index.js";

export function showUsersCounters(type?: string, filteredUser?: IUser[]): void {
  countAllUsers("#allUsersCounter");
  countAtiveUsers("#ativeUsersCounter");
  countUnableUsers("#unableUsersCounter");
  countFilterUsers("#filterUsersCounter", type!, filteredUser);
  countAtiveInativePercentage("#ativeUsersPercentageCounter", type!);
}

/* Contador de utilizadores ativos */
function countAtiveUsers(id: string): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    section.textContent = `${UserService.getActiveUsers().length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de utilizadores inativos */
function countUnableUsers(id: string): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    section.textContent = `${UserService.getInactiveUsers().length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de utilizadores filtrados por nome */
function countFilterUsers(
  id: string,
  type: string,
  filteredUser?: IUser[],
): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    if (type === "userFiltered") {
      section.textContent = `${filteredUser?.length}`;
    } else {
      section.textContent = "0";
    }
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de utilizadores */
function countAllUsers(id: string): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    section.textContent = `${UserService.getAllUsers().length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Percentagem de utilizadores ativos */
function countAtiveInativePercentage(id: string, type: string): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  let activeInativeUsers;

  if (section) {
    if (type === "inactivos") {
      activeInativeUsers = UserService.getInactiveUsers().length;
    } else {
      activeInativeUsers = UserService.getActiveUsers().length;
    }

    const totalUsers = UserService.getAllUsers().length;
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
