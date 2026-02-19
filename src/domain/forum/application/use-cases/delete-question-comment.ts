import type { QuestionsCommentsRepository } from "../repositories/questions-comments-repository.js";
import { left, right, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<Error, {}>;

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}
  async execute({
    authorId,
    questionId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionsCommentsRepository.findById(questionId);
    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionsCommentsRepository.delete(
      questionComment.id.toString(),
    );

    return right({});
  }
}
