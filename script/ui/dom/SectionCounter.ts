import { createFigureWithImage, createSection } from "./CreatePage.js";

/**
 * Cria qualquer seção de contador de tarefas (Total, Pendentes ou Concluídas)
 */


export function createStatisticsCounter(
  sectionId: string,
  imgId: string,
  src: string,
  label: string,
  counterId: string,
): HTMLElement {
  const figure = createFigureWithImage(
    imgId,
    `${src}`,
    label,

  ) as HTMLElement;

  const counterSection = createSection(counterId) as HTMLElement;
  counterSection.classList.add("counter-item");

  const wrapper = createSection(sectionId) as HTMLElement;
  wrapper.classList.add("statistics");
  wrapper.append(figure, counterSection);

  return wrapper;
}
