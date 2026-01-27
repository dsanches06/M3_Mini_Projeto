import { UserRole } from "../security/UserRole.js";
export default class NotificationService {
    constructor(users) {
        this.users = users;
    }
    // Adiciona usuários ao serviço de notificação
    notifyUser(userId, message) {
        const user = this.users.find((u) => u.getId() === userId);
        if (user) {
            const notification = new Notification(message);
            console.log(notification);
        }
    }
    // Notifica um grupo de usuários
    notifyGroup(userIds, message) {
        userIds.forEach((userId) => this.notifyUser(userId, message));
    }
    // Notifica todos os administradores
    notifyAdmins(message) {
        const adminUsers = this.users.filter((u) => u.getRole() === UserRole.ADMIN);
        adminUsers.forEach((admin) => this.notifyUser(admin.getId(), message));
    }
}
