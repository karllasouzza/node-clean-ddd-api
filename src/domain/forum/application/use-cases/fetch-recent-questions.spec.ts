import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.js";
import { makeQuestion } from "test/factories/make-question.js";
import { Slug } from "../../enterprise/entities/values-objects/slug.js";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// SUT = System Under Test
let sut: FetchRecentQuestionsUseCase;

describe("Fetch Recent Questions Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });
  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 1, 10),
      }),
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 1, 18),
      }),
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 1, 11),
      }),
    );

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2024, 1, 18),
      }),
      expect.objectContaining({
        createdAt: new Date(2024, 1, 11),
      }),
      expect.objectContaining({
        createdAt: new Date(2024, 1, 10),
      }),
    ]);
  });

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion({}));
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
