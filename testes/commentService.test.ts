import { describe, it, expect } from "vitest";
import { CommentService } from "../src/services/commentService.js";

describe("CommentService", () => {
  it("adds, retrieves and deletes comments", () => {
    const svc = new CommentService();
    svc.addComment(2001, 42, "hello");
    svc.addComment(2001, 43, "hi");

    const comments = svc.getComments(2001);
    expect(comments.length).toBe(2);

    const idToDelete = comments[0].getId();
    svc.deleteComment(idToDelete);
    const after = svc.getComments(2001);
    expect(after.length).toBe(1);
  });
});