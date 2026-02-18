import type { QuestionComment } from "../../enterprise/entities/question-comment.js";
import type { QuestionsCommentsRepository } from "../repositories/questions-comments-repository.js";

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsUseCaseResponse {
  questionsComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionsCommentsRepository: QuestionsCommentsRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionsComments = await this.questionsCommentsRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    );

    return { questionsComments };
}
}
