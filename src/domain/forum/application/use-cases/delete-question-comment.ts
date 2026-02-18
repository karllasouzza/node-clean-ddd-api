import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import { QuestionComment } from "../../enterprise/entities/question-comment.js";
import type { QuestionsCommentsRepository } from "../repositories/questions-comments-repository.js";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}
  async execute({ authorId, questionId }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment =
      await this.questionsCommentsRepository.findById(questionId);
    if (!questionComment) {
      throw new Error("Question comment not found");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this comment");
    }

    await this.questionsCommentsRepository.delete(
      questionComment.id.toString(),
    );

    return {};
  }
}
