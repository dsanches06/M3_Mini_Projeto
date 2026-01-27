export function menuSelected(id) {
    const links = document.querySelectorAll(".js-link");
    links.forEach((item) => item.classList.remove("menu-actived"));
    const menu = document.querySelector(`${id}`);
    if (menu) {
        menu.classList.add("menu-actived");
    }
    else {
        console.warn(`Elemento ${id} não foi renderizado no DOM.`);
    }
}
