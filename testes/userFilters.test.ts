import { beforeEach, describe, it, expect } from "vitest";
import { UserService } from "../src/services/userService";
import { getActiveUsers, getInactiveUsers } from "../src/ui/gestUserTask/GestUserUI";
import { UserClass } from "../src/models/UserClass";
import { UserRole } from "../src/security/UserRole";
import { IdGenerator } from "../src/utils/IdGenerator";

// Garantir ambiente limpo antes de cada teste
beforeEach(() => {
  UserService.getAllUsers().forEach((u) => UserService.removeUser(u.getId()));
});

describe("Filtragem de utilizadores (ativos/inativos)", () => {
  it("deve retornar utilizadores ativos e inativos conforme o estado atual do UserService", () => {
    const idGen = new IdGenerator();

    const activeUser = new UserClass(idGen.generate(), "Ativo", "a@example.com", UserRole.MEMBER);
    const inactiveUser = new UserClass(idGen.generate(), "Inativo", "i@example.com", UserRole.MEMBER);

    UserService.addUser(activeUser);
    UserService.addUser(inactiveUser);

    // tornar o segundo utilizador inativo
    inactiveUser.toggleActive();

    const active = getActiveUsers(UserService.getAllUsers());
    const inactive = getInactiveUsers(UserService.getAllUsers());

    const activeIds = active.map((u) => u.getId());
    const inactiveIds = inactive.map((u) => u.getId());

    expect(activeIds).toContain(activeUser.getId());
    expect(activeIds).not.toContain(inactiveUser.getId());

    expect(inactiveIds).toContain(inactiveUser.getId());
    expect(inactiveIds).not.toContain(activeUser.getId());
  });

  it("deve atualizar os resultados após alternar o estado de um utilizador", () => {
    const idGen = new IdGenerator();

    const u = new UserClass(idGen.generate(), "Pedro", "p@example.com", UserRole.MEMBER);
    UserService.addUser(u);

    // inicialmente está ativo
    expect(getActiveUsers(UserService.getAllUsers()).map((x) => x.getId())).toContain(u.getId());

    // fica inativo
    u.toggleActive();

    expect(getInactiveUsers(UserService.getAllUsers()).map((x) => x.getId())).toContain(u.getId());
    expect(getActiveUsers(UserService.getAllUsers()).map((x) => x.getId())).not.toContain(u.getId());
  });
});
