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
  TaskStatus,
} from "./src/tasks/index.js";

// IMPLEMENTAR UM FLUXO REAL:
// - configurar sistema
SystemConfig.appName = "Task Management System";
SystemConfig.version = "1.0.0";
SystemConfig.setEnvironment("development");
console.log(SystemConfig.getInfo());

//isUserValidar dados e criar no utilizador sem role
let isUserValid = true;
do {
  for (const user of fakeUsersData) {
    // - isUserValidar dados
    if (!GlobalValidators.isNonEmpty(user.name)) {
      SystemLogger.log("O nome não pode estar vazio.");
      isUserValid = false;
    }

    if (!GlobalValidators.minLength(user.name, 3)) {
      SystemLogger.log("O nome deve ter pelo menos 3 caracteres.");
      isUserValid = false;
    }

    if (!GlobalValidators.isValidEmail(user.email)) {
      SystemLogger.log(
        "Introduza um endereço de email válido (ex: nome@email.com)",
      );
      isUserValid = false;
    }

    if (isUserValid === true) {
      const Id = IdGenerator.generate();
      UserService.addUser(new UserClass(Id, user.name, user.email));
      SystemLogger.log(`Utilizador ${user.name} foi adicionado com sucesso.`);
    }
  }
} while (isUserValid !== true);

//criar os 3 tipos de Tasks
let isTaskValid = true;
do {
  for (const task of fakeTasksData) {
    // - validar dados
    if (!BusinessRules.isValidTitle(task.title)) {
      SystemLogger.log("O título deve ter pelo menos 3 caracteres.");
      isTaskValid = false;
    }

    if (!GlobalValidators.isNonEmpty(task.title)) {
      SystemLogger.log("O título não pode estar vazio.");
      isTaskValid = false;
    }

    if (!GlobalValidators.isNonEmpty(task.category)) {
      SystemLogger.log("A categoria não pode estar vazio.");
      isTaskValid = false;
    }

    if (!GlobalValidators.isNonEmpty(task.type)) {
      SystemLogger.log("O tipo não pode estar vazio.");
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
        SystemLogger.log(`Tarefa ${task.title} foi adicionada com sucesso.`);
      }
    }
  }
} while (isTaskValid !== true);

// - aplicar regras
TaskService.getAllTasks().forEach((task) => {
  processTask(task);
});

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
        `Tarefa ${task.getTitle()} foi atribuída ao utilizador ${user.getName()}.`,
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
            `Tarefa ${task.getTitle()} foi completada pelo utilizador ${user.getName()}.`,
          );
        }
      });
    }
  }
});

//verificar se o utilziador pode ser desativado
UserService.getAllUsers().forEach((user) => {
  const activeTasks = AssignmentService.getTasksFromUser(user.getId()).filter(
    (task) => task.getCompleted() === false,
  ).length;

  const canDeactivate = BusinessRules.canUserBeDeactivated(activeTasks);
  if (canDeactivate) {
    user.toggleActive();
    SystemLogger.log(`Utilizador ${user.getName()} foi desativado.`);
  } else {
    SystemLogger.log(
      `Utilizador ${user.getName()} não pode ser desativado, pois possui tarefas pendentes.`,
    );
  }
});

// - imprimir resultados
SystemLogger.log("\n--- Relatório ---");
SystemLogger.getLogs().forEach((log) => console.log(log));
