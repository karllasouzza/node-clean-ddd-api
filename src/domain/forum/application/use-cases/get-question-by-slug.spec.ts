import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.js";
import { makeQuestion } from "test/factories/make-question.js";
import { Slug } from "../../enterprise/entities/values-objects/slug.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// SUT = System Under Test
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });
  it("should get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("this-is-the-question-title"),
    });
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "this-is-the-question-title",
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      const { question } = result.value;
      expect(question.id).toBeDefined();
      expect(question.id).toBe(newQuestion.id);
      expect(question.slug.value).toBe("this-is-the-question-title");
    }
  });
});
