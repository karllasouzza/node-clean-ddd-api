import type { Question } from "@/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionsRepository {
  public items: Question[] = [];

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);
    return question || null;
  }

  async create(question: Question): Promise<Question> {
    this.items.push(question);
    return question;
  }
}
