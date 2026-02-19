import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import type { QuestionAttachment } from "../../enterprise/entities/question-attachment.js";

export interface QuestionsAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}
