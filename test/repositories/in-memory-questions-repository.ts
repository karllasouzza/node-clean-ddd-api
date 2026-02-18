import type { Question } from "@/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionsRepository {
  public items: Question[] = [];

  async findById(questionId: string) {
    const question = this.items.find(
      (item) => item.id.toString() === questionId,
    );
    return question || null;
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);
    return question || null;
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    );

    if (questionIndex >= 0) {
      this.items[questionIndex] = question;
    }

    return Promise.resolve();
  }

  async create(question: Question): Promise<Question> {
    this.items.push(question);
    return question;
  }

  async delete(questionId: string): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toString() === questionId,
    );

    if (questionIndex >= 0) {
      this.items.splice(questionIndex, 1);
    }
  }
}
