import { UserRole } from "./../security/UserRole";
import ITask from "./../tasks/ITask";

export default interface IUser {
  getId(): number;
  isActive(): boolean;
  toggleActive(): void;
  getRole(): UserRole;
  getEmail(): string;
  getTasks(): ITask[];
}
