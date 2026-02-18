import type { AnswersCommentsRepository } from "../repositories/answer-comments-repository.js";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}
  async execute({ authorId, answerId }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment =
      await this.answersCommentsRepository.findById(answerId);
    if (!answerComment) {
      throw new Error("Answer comment not found");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this comment");
    }

    await this.answersCommentsRepository.delete(answerComment.id.toString());

    return {};
  }
}
