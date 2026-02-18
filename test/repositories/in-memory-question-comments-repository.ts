import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment.js";

export class InMemoryQuestionCommentsRepository {
  public items: QuestionComment[] = [];

  async findById(questionCommentId: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() === questionCommentId,
    );

    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: { page: number },
  ): Promise<QuestionComment[]> {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;

    return this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice(startIndex, endIndex);
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async delete(questionCommentId: string): Promise<void> {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === questionCommentId,
    );

    if (questionCommentIndex !== -1) {
      this.items.splice(questionCommentIndex, 1);
    }
  }
}
