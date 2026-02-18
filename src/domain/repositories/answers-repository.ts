import { Answer } from "../entities/answer.js";

export interface AnswersRepository {
  create(answer: Answer): void;
}
