import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import type { Answer } from "@/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswersRepository {
  public items: Answer[] = [];

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === answerId);
    return answer || null;
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
  async save(answer: Answer) {
    const answerIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    );

    if (answerIndex >= 0) {
      this.items[answerIndex] = answer;
    }
  }

  async create(answer: Answer): Promise<Answer> {
    this.items.push(answer);
    return answer;
  }

  async delete(answerId: string): Promise<void> {
    const answerIndex = this.items.findIndex(
      (item) => item.id.toString() === answerId,
    );

    if (answerIndex >= 0) {
      this.items.splice(answerIndex, 1);
    }

    return Promise.resolve();
  }
}
