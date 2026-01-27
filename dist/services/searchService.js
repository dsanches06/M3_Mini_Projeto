//Dicas:
// Pesquisa por texto, utilizador e estado
export default class SearchService {
    constructor(users, tasks) {
        this.users = users;
        this.tasks = tasks;
    }
    searchByTitle(text) {
        return this.tasks.filter((task) => task.getTitle().includes(text));
    }
    searchByUser(userId) {
        return this.users.find((u) => u.getId() === userId);
    }
    searchByStatus(status) {
        return this.tasks.filter((task) => task.getStatus() === status);
    }
    globalSearch(query) {
        let results = [];
        if (query.title) {
            results = results.concat(this.searchByTitle(query.title));
        }
        if (query.userId) {
            results = results.concat(this.searchByUser(query.userId));
        }
        if (query.status) {
            results = results.concat(this.searchByStatus(query.status));
        }
        const uniqueIds = new Set();
        const uniqueResults = results.filter((item) => {
            const id = item.getId();
            if (!uniqueIds.has(id)) {
                uniqueIds.add(id);
            }
        });
        return uniqueResults;
    }
}
