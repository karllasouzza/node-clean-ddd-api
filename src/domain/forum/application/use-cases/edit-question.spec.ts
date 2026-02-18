import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "test/factories/make-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { EditQuestionUseCase } from "./edit-question.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// SUT = System Under Test
let sut: EditQuestionUseCase;

describe("Edit Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("should edit a question by id", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("question-1"),
    );
    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: "author-1",
      title: "Updated Title",
      content: "Updated Content",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject(
      expect.objectContaining({
        title: "Updated Title",
        content: "Updated Content",
      }),
    )
  });

  it("should not edit a question if the authorId does not match", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("question-1"),
    );
    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        authorId: "author-2",
        questionId: "question-1",
        title: "Updated Title",
        content: "Updated Content",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
