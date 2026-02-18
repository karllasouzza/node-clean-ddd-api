import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { makeAnswer } from "test/factories/make-answer.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { EditAnswerUseCase } from "./edit-answer.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// SUT = System Under Test
let sut: EditAnswerUseCase;

describe("Edit Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });
  it("should edit a answer by id", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("answer-1"),
    );
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: "author-1",
      content: "Updated Content",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject(
      expect.objectContaining({
        content: "Updated Content",
      }),
    );
  });

  it("should not edit a answer if the authorId does not match", async () => {
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
        content: "Updated Content",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
