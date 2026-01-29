export class SystemConfig {
  static appName: string;
  static version: string;
  static environment: string;

  static setEnvironment(env: string): void {
    this.environment = env;
  }

  static getInfo(): string {
    return `${this.appName} - ${this.version} - ${this.environment}`;
  }
}
