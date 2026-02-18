import type { Answer } from "../../enterprise/entities/answer.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionsAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    );

    return { answers };
  }
}
