import IUser from "../models/IUser.js";
import ITask from "../tasks/ITask.js";

/* Obter o último ID de utilizador */
export function getLastId(list: IUser[] | ITask[]): number {
  //inicializar a variável do último ID
  let lastUserID: number = 0;
  //obter o ultimo elemento no array
  const lastUser = list[list.length - 1] as IUser | ITask;
  //  verifica se o ultimo elemento existe
  if (lastUser) {
    //atribuir o id do ultimo elemento à variavel
    lastUserID = lastUser.getId();
  }
  //se não existir, retorna 0
  return lastUserID;
}
