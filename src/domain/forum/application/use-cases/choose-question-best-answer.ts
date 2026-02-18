import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";
import type { Question } from "../../enterprise/entities/question.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}
  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this question");
    }

    question.bestAnswerId = new UniqueEntityId(answerId);

    await this.questionsRepository.save(question);

    return { question };
  }
}
