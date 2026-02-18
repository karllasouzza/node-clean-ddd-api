import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.js";

export class InMemoryAnswerCommentsRepository {
  public items: AnswerComment[] = [];

  async findById(answerCommentId: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find(
      (item) => item.id.toString() === answerCommentId,
    );

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: { page: number },
  ): Promise<AnswerComment[]> {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;

    return this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice(startIndex, endIndex);
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async delete(answerCommentId: string): Promise<void> {
    const answerCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === answerCommentId,
    );

    if (answerCommentIndex !== -1) {
      this.items.splice(answerCommentIndex, 1);
    }
  }
}
