import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  Question,
  type QuestionProps,
} from "@/domain/forum/enterprise/entities/question.js";
import { Slug } from "@/domain/forum/enterprise/entities/values-objects/slug.js";

export function makeQuestion(
  overrides: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId("author-1"),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      slug: Slug.create(faker.lorem.slug()),
      ...overrides,
    },
    id,
  );

  return question;
}
