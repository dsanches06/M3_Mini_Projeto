import { UserClass } from "../models/UserClass";
import { UserRole } from "../security/UserRole";

export class NotificationService {
  
  private users: UserClass[];

  constructor(users: UserClass[]) {
    this.users = users;
  }

  // Adiciona usuários ao serviço de notificação
  notifyUser(userId: number, message: string) {
    const user = this.users.find((u) => u.getId() === userId);
    if (user) {
      const notification = new Notification(message);
      console.log(notification);
    }
  }

  // Notifica um grupo de usuários
  notifyGroup(userIds: number[], message: string) {
    userIds.forEach((userId) => this.notifyUser(userId, message));
  }

  // Notifica todos os administradores
  notifyAdmins(message: string) {
    const adminUsers = this.users.filter((u) => u.getRole() === UserRole.ADMIN);
    adminUsers.forEach((admin) => this.notifyUser(admin.getId(), message));
  }
}
