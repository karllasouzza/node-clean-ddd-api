import type { AnswerComment } from "../../enterprise/entities/answer-comment.js";
import type { AnswersCommentsRepository } from "../repositories/answer-comments-repository.js";

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentsUseCaseResponse {
  answersComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}
  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answersComments = await this.answersCommentsRepository.findManyByAnswerId(
      answerId,
      {
        page,
      },
    );

    return { answersComments };
}
}
