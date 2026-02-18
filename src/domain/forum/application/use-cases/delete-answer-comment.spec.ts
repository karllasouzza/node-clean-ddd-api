import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository.js";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment.js";
import { makeAnswerComment } from "test/factories/make-answer-comment.js";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
// SUT = System Under Test
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comment Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository =
      new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to delete a answer comment", async () => {
    const newAnswer = makeAnswerComment({});

    await inMemoryAnswerCommentsRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    });

    expect(
      inMemoryAnswerCommentsRepository?.items[0]?.content,
    ).toBeUndefined();
  });

  it("should not be able to delete a answer comment if the author is different", async () => {
    const newAnswer = makeAnswerComment({
      authorId: new UniqueEntityId("author-1"),
    });

    await inMemoryAnswerCommentsRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: new UniqueEntityId("author-2").toString(),
      }),
    ).rejects.toBeInstanceOf(Error);
    expect(inMemoryAnswerCommentsRepository?.items[0]?.content).toBeDefined();
  });
});
