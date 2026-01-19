import { createFigureWithImage, createSection } from "./CreatePage.js";
/**
 * Cria qualquer seção de contador de tarefas (Total, Pendentes ou Concluídas)
 */
export function createStatisticsCounter(sectionId, imgId, src, label, counterId) {
    const figure = createFigureWithImage(imgId, `${src}`, label);
    const counterSection = createSection(counterId);
    counterSection.classList.add("counter-item");
    const wrapper = createSection(sectionId);
    wrapper.classList.add("statistics");
    wrapper.append(figure, counterSection);
    return wrapper;
}
