import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "test/factories/make-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { EditQuestionUseCase } from "./edit-question.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";
import { makeQuestionAttachment } from "test/factories/make-question-attachment.js";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachment-repository.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
// SUT = System Under Test
let sut: EditQuestionUseCase;

describe("Edit Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    );
  });
  it("should edit a question by id", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("question-1"),
    );
    await inMemoryQuestionsRepository.create(newQuestion);

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId("attachment-1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId("attachment-2"),
      }),
    );

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: "author-1",
      title: "Updated Title",
      content: "Updated Content",
      attachmentsIds: ["attachment-1", "attachment-3"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject(
      expect.objectContaining({
        title: "Updated Title",
        content: "Updated Content",
      }),
    );

    expect(
      inMemoryQuestionsRepository.items[0]?.attachments.currentItems,
    ).toHaveLength(2);
    expect(
      inMemoryQuestionsRepository.items[0]?.attachments.currentItems,
    ).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId("attachment-1"),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId("attachment-3"),
      }),
    ]);
  });

  it("should not edit a question if the authorId does not match", async () => {
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
      title: "Updated Title",
      content: "Updated Content",
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(NotAllowedError);
    }
  });
});
