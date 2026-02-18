import type { Answer } from "../../enterprise/entities/answer.js";

export interface AnswersRepository {
  findById(answerId: string): Promise<Answer | null>;
  save(answer: Answer): Promise<void>;
  create(answer: Answer): Promise<Answer>;
  delete(answerId: string): Promise<void>;
}
