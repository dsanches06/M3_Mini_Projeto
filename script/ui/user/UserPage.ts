import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import { addElementInContainer } from "../dom/ContainerSection.js";
import { createSection } from "../dom/CreatePage.js";
import { createTitle } from "../dom/CreateTitle.js";
import { menuSelected } from "../dom/MenuSelected.js";
import { createStatisticsCounter } from "../dom/SectionCounter.js";
import renderUsers, { showUsersCount } from "./UserUI.js";

/* */
export function loadPageAllUser(gestUserTask: GestUserTask): void {
  /* ativa o menu Users */
  menuSelected("#menuUsers");
  //
  addElementInContainer(createTitle("GESTÃO DE UTILIZADORES"));
  //
  addElementInContainer(createUserCounter("#userCounters"));
  //
  showUsersCount(gestUserTask.users as User[]);
  //
  addElementInContainer(renderUsers(gestUserTask.users as User[]));
}

/* */
function createUserCounter(id: string): HTMLElement {
  //
  const allUsersBtn = createStatisticsCounter(
    "allUsers",
    "allUsersBtn",
    "../../../images/users.png",
    "utilizadores",
    "allUsersCount",
  ) as HTMLElement;

  //
  const ativeUsersBtn = createStatisticsCounter(
    "ativeUsers",
    "ativeUsersBtn",
    "../../../images/ative.png",
    "ativos",
    "ativeUsersCount",
  ) as HTMLElement;

  //
  const unableUsersBtn = createStatisticsCounter(
    "unableUsers",
    "unableUsersBtn",
    "../../../images/unable.png",
    "Inativos",
    "unableUsersCount",
  ) as HTMLElement;

  //
  const ativeUsersPercentageBtn = createStatisticsCounter(
    "ativeUserPercentage",
    "ativeUsersPercentageBtn",
    "../../../images/ative.png",
    "ativos (%)",
    "ativeUsersPercentageCount",
  ) as HTMLElement;
  //
  const sectionUsersCounter = createSection(`${id}`) as HTMLElement;
  sectionUsersCounter.classList.add("users-counters");
  sectionUsersCounter.append(
    allUsersBtn,
    ativeUsersBtn,
    unableUsersBtn,
    ativeUsersPercentageBtn,
  );
  return sectionUsersCounter;
}
