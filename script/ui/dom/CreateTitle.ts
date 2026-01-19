import { createHeadingTitle } from "./CreatePage.js";

/**/ 
export function createTitle(title: string): HTMLHeadingElement {
  const titleHeading = createHeadingTitle(`${title}`) as HTMLHeadingElement;
  return titleHeading;
}