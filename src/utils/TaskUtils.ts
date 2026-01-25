import { ITask } from "../tasks/index.js";

// Função para processar uma tarefa com base no seu tipo
//ver isso
export function processTask(task: ITask) {

  const type = task.getType();

  if (type === "Bug") {
    console.log(`Processing Bug Task: ${task.title}`);
  } else if (type === "Feature") {
    console.log(`Processing Feature Task: ${task.title}`);
  } else {
    console.log(`Processing Unknown Task Type: ${task.title}`);
  }
  //substituido pelo switch case
  switch (type) {
    case "Bug":
      console.log(`Processing Bug Task: ${task.title}`);
      break;
    case "Feature":
      console.log(`Processing Feature Task: ${task.title}`);
      break;
    default:
      console.log(`Processing Unknown Task Type: ${task.title}`);
      break;
  }
}
