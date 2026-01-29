export class BusinessRules {
  static canUserBeDeactivated(activeTasks: number): boolean {
    return activeTasks === 0 ? true : false;
  }

  static canTaskBeCompleted(isBlocked: boolean): boolean {
    return isBlocked === true ? true : false;
  }

  static canAssignTask(active: boolean): boolean {
    return active === true ? true : false;
  }

  static isValidTitle(title: string): boolean {
    return title.trim().length >= 3 ? true : false;
  }
}
