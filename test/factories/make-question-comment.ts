import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  QuestionComment,
  type QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment.js";

export function makeQuestionComment(
  overrides: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      questionId: new UniqueEntityId("question-1"),
      authorId: new UniqueEntityId("author-1"),
      content: faker.lorem.paragraph(),
      ...overrides,
    },
    id,
  );

  return questionComment;
}
