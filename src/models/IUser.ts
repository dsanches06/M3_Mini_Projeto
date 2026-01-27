import { UserRole } from "./../security/UserRole.js";
import ITask from "./../tasks/ITask.js";

export default interface IUser {
  getId(): number;
  isActive(): boolean;
  toggleActive(): void;
  getRole(): UserRole;
  getEmail(): string;
  getTasks(): ITask[];
}
