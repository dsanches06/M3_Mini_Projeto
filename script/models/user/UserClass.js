/*  Classe UtilizadorClass */
export default class UserClass {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isAtive = true;
    }
    desativar() {
        this.isAtive = false;
    }
    toggleEstado() {
        this.isAtive = !this.isAtive;
    }
}
