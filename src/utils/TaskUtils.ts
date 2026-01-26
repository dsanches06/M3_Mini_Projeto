import  ITask  from "../tasks/ITask";

// Função para processar uma tarefa com base no seu tipo
//ver isso
export function processTask(task: ITask) {
  const type = task.getType();
  switch (type) {
    case "bug":
      //bug → regras mais rígidas, mais validações, logs automáticos, mais notificações

      break;
    case "feature":
      //feature → regras mais flexíveis, menos validações

      break;
    case "task":
      //task → comportamento genérico

      break;
    default:
      //colocar um banner
      break;
  }
}
