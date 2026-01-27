import { createSection } from "../ui/dom/CreatePage.js";
export function showInfoBanner(message, className) {
    const banner = createSection("infoBanner");
    banner.textContent = message;
    banner.classList.add(className);
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 3000);
}
