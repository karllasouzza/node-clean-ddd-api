import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "test/factories/make-question.js";
import { DeleteQuestionUseCase } from "./delete-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// SUT = System Under Test
let sut: DeleteQuestionUseCase;

describe("Delete Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("should delete a question by id", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("question-1"),
    );
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "author-1",
      questionId: "question-1",
    });

    expect(result.isRight()).toBe(true);

    const deletedQuestion =
      await inMemoryQuestionsRepository.findById("question-1");
    expect(deletedQuestion).toBeNull();
  });

  it("should not delete a question if the authorId does not match", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("question-1"),
    );
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "author-2",
      questionId: "question-1",
    });

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(NotAllowedError);
    }
  });
});
