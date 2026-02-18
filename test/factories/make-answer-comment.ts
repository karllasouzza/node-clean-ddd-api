import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  AnswerComment,
  type AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment.js";

export function makeAnswerComment(
  overrides: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      answerId: new UniqueEntityId("answer-1"),
      authorId: new UniqueEntityId("author-1"),
      content: faker.lorem.paragraph(),
      ...overrides,
    },
    id,
  );

  return answerComment;
}
