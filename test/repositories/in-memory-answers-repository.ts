import type { Answer } from "@/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswersRepository {
  public items: Answer[] = [];

  async create(answer: Answer): Promise<Answer> {
    this.items.push(answer);
    return answer;
  }
}
