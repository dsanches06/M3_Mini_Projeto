import BaseEntity from "./BaseEntity";
import { UserRole } from "../security/UserRole";
import ITask from "./../tasks/ITask";

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

  getId(): number {
    return super.getId();
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
