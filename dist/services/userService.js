export default class UserService {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    removeUser(id) {
        const index = this.users.findIndex((u) => u.getId() === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
    getActiveUsers() {
        return this.users.filter((u) => u.isActive());
    }
    getAllUsers() {
        return this.users;
    }
}
