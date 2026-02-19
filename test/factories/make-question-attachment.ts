import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  QuestionAttachment,
  type QuestionAttachmentProps,
} from "@/domain/forum/enterprise/entities/question-attachment.js";

export function makeQuestionAttachment(
  overrides: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overrides,
    },
    id,
  );

  return questionAttachment;
}
