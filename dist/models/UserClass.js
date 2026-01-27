import BaseEntity from "./BaseEntity.js";
export default class UserClass extends BaseEntity {
    constructor(id, name, email, role) {
        super(id);
        this.name = name;
        this.email = email;
        this.active = true;
        this.role = role;
        this.tasks = [];
    }
    getName() {
        return this.name;
    }
    isActive() {
        return this.active;
    }
    toggleActive() {
        this.active = !this.active;
    }
    getRole() {
        return this.role;
    }
    getEmail() {
        return this.email;
    }
    getTasks() {
        return this.tasks;
    }
}
export function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
