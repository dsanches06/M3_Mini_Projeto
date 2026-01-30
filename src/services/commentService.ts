import Comment from "../comments/Comment.js";

/* Serviço para gerir comentários associados a tarefas */
export class CommentService {
  private comments: Comment[];
  private count: number;

  constructor() {
    this.comments = [];
    this.count = 0;
  }

  /* Adiciona um novo comentário a uma tarefa */
  addComment(taskId: number, userId: number, message: string) {
    this.comments.push(new Comment((this.count += 1), taskId, userId, message));
  }

  /* Obtém todos os comentários associados a uma tarefa específica */
  getComments(taskId: number) {
    return this.comments.filter((c) => c.getTaskId() === taskId);
  }

  /* Elimina um comentário pelo seu ID */
  deleteComment(commentId: number) {
    const commentIndex = this.comments.findIndex(
      (c) => c.getId() === commentId,
    );
    if (commentIndex !== -1) {
      this.comments.splice(commentIndex, 1);
    }
  }
}
