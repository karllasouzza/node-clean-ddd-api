import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import type { Answer } from "../../enterprise/entities/answer.js";

export interface AnswersRepository {
  findById(answerId: string): Promise<Answer | null>;
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>;
  save(answer: Answer): Promise<void>;
  create(answer: Answer): Promise<Answer>;
  delete(answerId: string): Promise<void>;
}
