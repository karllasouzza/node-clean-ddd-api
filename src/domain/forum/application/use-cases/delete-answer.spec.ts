import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { makeAnswer } from "test/factories/make-answer.js";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { DeleteAnswerUseCase } from "./delete-answer.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// SUT = System Under Test
let sut: DeleteAnswerUseCase;

describe("Delete Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });
  it("should delete an answer by id", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("answer-1"),
    );
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: "answer-1",
    });

    const deletedAnswer = await inMemoryAnswersRepository.findById("answer-1");
    expect(deletedAnswer).toBeNull();
  });

  it("should not delete an answer if the authorId does not match", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("answer-1"),
    );
    await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        authorId: "author-2",
        answerId: "answer-1",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
