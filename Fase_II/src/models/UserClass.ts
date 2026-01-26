import BaseEntity from "./BaseEntity.js";
import { UserRole } from "../security/UserRole.js";
import ITask from "./../tasks/ITask.js";

export default class UserClass extends BaseEntity {
  private email: string;
  private active: boolean;
  private role: UserRole;
  private tasks: ITask[];

  constructor(id: number, email: string, role: UserRole) {
    super(id);
    this.email = email;
    this.active = true;
    this.role = role;
    this.tasks = [];
  }

  isActive(): boolean {
    return this.active;
  }

  toggleActive(): void {
    this.active = !this.active;
  }

  getRole(): UserRole {
    return this.role;
  }

  getEmail(): string {
    return this.email;
  }

  getTasks(): ITask[] {
    return this.tasks;
  }
}

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
