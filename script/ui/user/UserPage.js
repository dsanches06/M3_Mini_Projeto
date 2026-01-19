import { addElementInContainer } from "../dom/ContainerSection.js";
import { createSection } from "../dom/CreatePage.js";
import { createTitle } from "../dom/CreateTitle.js";
import { menuSelected } from "../dom/MenuSelected.js";
import { createStatisticsCounter } from "../dom/SectionCounter.js";
import renderUsers, { showUsersCount } from "./UserUI.js";
/* */
export function loadPageAllUser(gestUserTask) {
    /* ativa o menu Users */
    menuSelected("#menuUsers");
    //
    addElementInContainer(createTitle("GESTÃO DE UTILIZADORES"));
    //
    addElementInContainer(createUserCounter("#userCounters"));
    //
    showUsersCount(gestUserTask.users);
    //
    addElementInContainer(renderUsers(gestUserTask.users));
}
/* */
function createUserCounter(id) {
    //
    const allUsersBtn = createStatisticsCounter("allUsers", "allUsersBtn", "../../../images/users.png", "utilizadores", "allUsersCount");
    //
    const ativeUsersBtn = createStatisticsCounter("ativeUsers", "ativeUsersBtn", "../../../images/ative.png", "ativos", "ativeUsersCount");
    //
    const unableUsersBtn = createStatisticsCounter("unableUsers", "unableUsersBtn", "../../../images/unable.png", "Inativos", "unableUsersCount");
    //
    const ativeUsersPercentageBtn = createStatisticsCounter("ativeUserPercentage", "ativeUsersPercentageBtn", "../../../images/ative.png", "ativos (%)", "ativeUsersPercentageCount");
    //
    const sectionUsersCounter = createSection(`${id}`);
    sectionUsersCounter.classList.add("users-counters");
    sectionUsersCounter.append(allUsersBtn, ativeUsersBtn, unableUsersBtn, ativeUsersPercentageBtn);
    return sectionUsersCounter;
}
