import { UserRole } from "../security/UserRole.js";
export function canCreatetask(role) {
    return (role === UserRole.ADMIN ||
        role === UserRole.MANAGER ||
        role === UserRole.MEMBER);
}
export function canEditTask(role) {
    return (role === UserRole.ADMIN ||
        role === UserRole.MANAGER ||
        role === UserRole.MEMBER);
}
export function canDeletetask(role) {
    return (role === UserRole.ADMIN ||
        role === UserRole.MANAGER ||
        role === UserRole.MEMBER);
}
export function canAssignTask(role) {
    return (role === UserRole.ADMIN ||
        role === UserRole.MANAGER ||
        role === UserRole.MEMBER);
}
