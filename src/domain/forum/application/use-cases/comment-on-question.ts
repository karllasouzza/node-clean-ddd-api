import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import { QuestionComment } from "../../enterprise/entities/question-comment.js";
import type { QuestionsCommentsRepository } from "../repositories/questions-comments-repository.js";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}
  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionsCommentsRepository.create(questionComment);


    return { questionComment };
  }
}
