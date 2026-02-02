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
import { Buffer } from "./src/helpers/index.js";
import {
  EntityList,
  SimpleCache,
  Favorites,
  Paginator,
  TagManager,
  WatcherSystem,
  PriorityManager,
  RatingSystem,
  DependencyGraph,
} from "./src/utils/index.js";
import { SystemLogger } from "./src/logs/SystemLogger.js";
import { fakeTasksData, fakeUsersData } from "./src/helpers/index.js";
import { UserClass, IUser } from "./src/models/index.js";
import { ITask, BugTask, FeatureTask, Task } from "./src/tasks/index.js";
import { TaskCategory } from "./src/tasks/TaskCategory.js";
import { TaskStatus } from "./src/tasks/TaskStatus.js";

// IMPLEMENTAR UM FLUXO REAL:
// - configurar sistema
SystemConfig.appName = "Task Management System";
SystemConfig.version = "1.0.0";
SystemConfig.setEnvironment("development");

SystemLogger.log("\n--- RELATÓRIO --- \n");
SystemLogger.log(SystemConfig.getInfo());
SystemLogger.log("");

//isUserValidar dados e criar no utilizador sem role
const userIdGenerator = new IdGenerator();
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
    const Id = userIdGenerator.generate();
    UserService.addUser(new UserClass(Id, user.name, user.email));
    SystemLogger.log(
      `INFO: ${user.name} com ID ${Id} foi adicionado com sucesso.`,
    );
  }
}

//dar espaço entre logs
SystemLogger.log("");

//criar os 3 tipos de Tasks
const taskIdGenerator = new IdGenerator();
for (const task of fakeTasksData) {
  let isTaskValid = true;
  // - validar dados
  
  let newTask: ITask | undefined;
  let category: TaskCategory = TaskCategory.PERSONAL;

  if (isTaskValid === true) {
    const Id = taskIdGenerator.generate();

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
SystemLogger.log("\nASSIGNMENTS...\n");
//verificar se tarefas podem ser associados ao utilizador
TaskService.getAllTasks().forEach((task) => {
  const users = UserService.getAllUsers();
  const activeUsers = users.filter((user) => user && user.isActive());

  if (activeUsers.length > 0) {
    const randomIndex = Math.floor(Math.random() * activeUsers.length);
    const selectedUser = activeUsers[randomIndex];

    const canAssign = BusinessRules.canAssignTask(selectedUser.isActive());
    if (canAssign) {
      AssignmentService.assignUser(task.getId(), selectedUser.getId());
      SystemLogger.log(
        `INFO: A tarefa ${task.getTitle()} foi atribuída para ${selectedUser.getName()}.`,
      );
    }
  }
});

// - aplicar regras
SystemLogger.log(
  "\nPROCESSING TASKS... " +
    TaskService.getAllTasks().length +
    " tarefas encontradas.\n",
);
let count = 0;
while (count < 1) {
  TaskService.getAllTasks().forEach((task) => {
    processTask(task);
  });
  count++;
}

//dar espaço entre logs
SystemLogger.log("\nVERIFICAR SE O UTILIZADOR PODE SER DESATIVADO...\n");
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
Buffer.reportProcessSummary();
