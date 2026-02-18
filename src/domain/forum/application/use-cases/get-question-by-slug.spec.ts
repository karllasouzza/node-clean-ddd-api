import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.js";
import { Question } from "../../enterprise/entities/question.js";
import { Slug } from "../../enterprise/entities/values-objects/slug.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// SUT = System Under Test
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });
  it("should get a question by slug", async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId("author-1"),
      title: "This is the question title",
      content: "This is the question content",
      slug: Slug.create("this-is-the-question-title"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "this-is-the-question-title",
    });

    expect(question.id).toBeDefined();
    expect(question.id).toBe(newQuestion.id);
    expect(question.title).toBe("This is the question title");
    expect(question.content).toBe("This is the question content");
  });
});
