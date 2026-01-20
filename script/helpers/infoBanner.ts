import { createSection } from "../ui/dom/CreatePage.js";

export function showInfoBanner(message: string, className: string): void {
  const banner = createSection("infoBanner") as HTMLElement;
  banner.textContent = message;
  banner.classList.add(className);
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 3000);
}
