import type { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment.js";

export class InMemoryQuestionAttachmentsRepository {
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    return this.items.filter(
      (item) => item.questionId.toString() === questionId,
    );
  }
}
