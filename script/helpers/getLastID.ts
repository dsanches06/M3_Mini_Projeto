import IUser from "../models/user/IUser.js";
import ITask from "../models/task/ITask.js";

/* Obter o último ID de utilizador */
export function getLastId(list: IUser[] | ITask[]): number {
  //inicializar a variável do último ID
  let lastUserID: number = 0;
  //obter o ultimo elemento no array
  const lastUser = list[list.length - 1];
  //  verifica se o ultimo elemento existe
  if (lastUser) {
    //atribuir o id do ultimo elemento à variavel
    lastUserID = lastUser.id;
  }
  //se não existir, retorna 0
  return lastUserID;
}
