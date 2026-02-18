import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "test/factories/make-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository.js";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment.js";
import { makeQuestionComment } from "test/factories/make-question-comment.js";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
// SUT = System Under Test
let sut: DeleteQuestionCommentUseCase;

describe("Delete Question Comment Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a question comment", async () => {
    const newQuestion = makeQuestionComment({});

    await inMemoryQuestionCommentsRepository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(
      inMemoryQuestionCommentsRepository?.items[0]?.content,
    ).toBeUndefined();
  });

  it("should not be able to delete a question comment if the author is different", async () => {
    const newQuestion = makeQuestionComment({
      authorId: new UniqueEntityId("author-1"),
    });

    await inMemoryQuestionCommentsRepository.create(newQuestion);

    await expect(
      sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: new UniqueEntityId("author-2").toString(),
      }),
    ).rejects.toBeInstanceOf(Error);
    expect(inMemoryQuestionCommentsRepository?.items[0]?.content).toBeDefined();
  });
});
