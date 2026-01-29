import {
  SystemConfig,
  BusinessRules,
  UserService,
  TaskService,
  AssignmentService,
} from "./src/services/index.js";
import {
  GlobalValidators,
  IdGenerator,
  processTask,
} from "./src/utils/index.js";
import { SystemLogger } from "./src/logs/SystemLogger.js";
import { fakeTasksData, fakeUsersData } from "./src/helpers/index.js";
import { UserClass } from "./src/models/index.js";
import {
  ITask,
  BugTask,
  FeatureTask,
  Task,
  TaskCategory,
} from "./src/tasks/index.js";

// IMPLEMENTAR UM FLUXO REAL:
// - configurar sistema
SystemConfig.appName = "Task Management System";
SystemConfig.version = "1.0.0";
SystemConfig.setEnvironment("development");

SystemLogger.log("\n--- RELATÓRIO --- \n");
SystemLogger.log(SystemConfig.getInfo());
SystemLogger.log("");

//isUserValidar dados e criar no utilizador sem role
for (const user of fakeUsersData) {
  let isUserValid = true;
  // - isUserValidar dados
  if (!GlobalValidators.isNonEmpty(user.name)) {
    SystemLogger.log("ERRO: O nome não pode estar vazio.");
    isUserValid = false;
  }

  if (!GlobalValidators.minLength(user.name, 3)) {
    SystemLogger.log(
      `ERRO: O nome ${user.name} deve ter pelo menos 3 caracteres.`,
    );
    isUserValid = false;
  }

  if (!GlobalValidators.isValidEmail(user.email)) {
    SystemLogger.log(
      `ERRO: O email ${user.email} não é válido (ex: nome@email.com)`,
    );
    isUserValid = false;
  }

  if (isUserValid === true) {
    const Id = IdGenerator.generate();
    UserService.addUser(new UserClass(Id, user.name, user.email));
    SystemLogger.log(`INFO: ${user.name} foi adicionado com sucesso.`);
  }
}

//dar espaço entre logs
SystemLogger.log("");

//criar os 3 tipos de Tasks
for (const task of fakeTasksData) {
  let isTaskValid = true;
  // - validar dados
  if (!BusinessRules.isValidTitle(task.title)) {
    SystemLogger.log(
      `ERRO: O título ${task.title} deve ter pelo menos 3 caracteres.`,
    );
    isTaskValid = false;
  }

  if (!GlobalValidators.isNonEmpty(task.title)) {
    SystemLogger.log("ERRO: O título não pode estar vazio.");
    isTaskValid = false;
  }

  if (!GlobalValidators.isNonEmpty(task.category)) {
    SystemLogger.log("ERRO: A categoria não pode estar vazio.");
    isTaskValid = false;
  }

  if (!GlobalValidators.isNonEmpty(task.type)) {
    SystemLogger.log("ERRO: O tipo não pode estar vazio.");
    isTaskValid = false;
  }

  let newTask: ITask | undefined;
  let category: TaskCategory = TaskCategory.PERSONAL;

  if (isTaskValid === true) {
    const Id = IdGenerator.generate();

    if (task.category === "Trabalho") {
      category = TaskCategory.WORKED;
    } else if (task.category === "Pessoal") {
      category = TaskCategory.PERSONAL;
    } else if (task.category === "Estudo") {
      category = TaskCategory.STUDY;
    }

    if (task.type === "Bugs") {
      newTask = new BugTask(Id, task.title, category);
    } else if (task.type === "Feature") {
      newTask = new FeatureTask(Id, task.title, category);
    } else if (task.type === "Task") {
      newTask = new Task(Id, task.title, category);
    }
    if (newTask) {
      TaskService.addTask(newTask);
      SystemLogger.log(
        `INFO: A tarefa ${newTask.getTitle()} do tipo ${newTask.getType()} foi adicionada com sucesso.`,
      );
    }
  }
}
//dar espaço entre logs
SystemLogger.log("\nASSIGNMENTS E COMPLETIONS...\n");
//verificar se tarefas podem ser associados ao utilizador
TaskService.getAllTasks().forEach((task) => {
  const total = UserService.getAllUsers().length;
  const id = Math.floor(Math.random() * total);
  const user = UserService.getUserById(id + 1);
  if (user) {
    //verificar se tarefas podem ser associados ao utilizador
    const canAssign = BusinessRules.canAssignTask(user.isActive());
    if (canAssign) {
      AssignmentService.assignUser(task.getId(), user.getId());
      SystemLogger.log(
        `INFO: A tarefa ${task.getTitle()} foi atribuída para ${user.getName()}.`,
      );
    }
    //verificar se o task pode ser completado
    const canComplete = BusinessRules.canTaskBeCompleted(
      task.getStatus().toString() === "BLOCKED",
    );
    if (canComplete) {
      AssignmentService.getTasksFromUser(user.getId()).forEach((t) => {
        if (t.getId() === task.getId()) {
          t.markCompleted();
          SystemLogger.log(
            `INFO: A tarefa ${task.getTitle()} foi completada pelo ${user.getName()}.`,
          );
        }
      });
    }
  }
});

// - aplicar regras
SystemLogger.log(
  "\nPROCESSANDO TAREFAS... " +
    TaskService.getAllTasks().length +
    " tarefas encontradas.\n",
);
TaskService.getAllTasks().forEach((task) => {
  processTask(task);
});

//dar espaço entre logs
SystemLogger.log("\nVERIFICANDO DESATIVAÇÕES DE USUÁRIOS...\n");
//verificar se o utilizador pode ser desativado
UserService.getAllUsers().forEach((user) => {
  const activeTasks = AssignmentService.getTasksFromUser(user.getId()).filter(
    (task) => task.getCompleted() === false,
  ).length;

  const canDeactivate = BusinessRules.canUserBeDeactivated(activeTasks);
  if (canDeactivate) {
    user.toggleActive();
    SystemLogger.log(
      `INFO: ${user.getName()} não tem tarefas pendentes e foi desativado.`,
    );
  } else {
    SystemLogger.log(
      `INFO: ${user.getName()} não pode ser desativado, pois possui tarefas pendentes.`,
    );
  }
});

// - imprimir resultados
SystemLogger.getLogs().forEach((log) => console.log(log));
