import { left, right, type Either } from "@/core/either.js";
import type { AnswersCommentsRepository } from "../repositories/answer-comments-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerCommentUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}
  async execute({
    authorId,
    answerId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answersCommentsRepository.findById(answerId);
    if (!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answersCommentsRepository.delete(answerComment.id.toString());

    return right({});
  }
}
