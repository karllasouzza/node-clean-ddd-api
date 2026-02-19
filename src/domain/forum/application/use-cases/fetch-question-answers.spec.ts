import { FetchQuestionsAnswersUseCase } from "./fetch-question-answers.js";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { makeAnswer } from "test/factories/make-answer.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// SUT = System Under Test
let sut: FetchQuestionsAnswersUseCase;

describe("Fetch Questions Answers Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
  });
  it("should be able to fetch questions answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      const { answers } = result.value;
      expect(answers).toHaveLength(3);
    }
  });

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId("question-1") }),
      );
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      const { answers } = result.value;
      expect(answers).toHaveLength(2);
    }
  });
});
