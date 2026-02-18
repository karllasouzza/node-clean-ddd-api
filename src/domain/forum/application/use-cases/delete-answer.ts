import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Answer } from "../../enterprise/entities/answer.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({ authorId, answerId }: DeleteAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this answer");
    }

    await this.answersRepository.delete(answerId);

    return {};
  }
}
