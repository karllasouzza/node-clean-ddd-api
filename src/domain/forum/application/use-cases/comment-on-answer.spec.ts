import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { makeAnswer } from "test/factories/make-answer.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { CommentOnAnswerUseCase } from "./comment-on-answer.js";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
// SUT = System Under Test
let sut: CommentOnAnswerUseCase;

describe("Comment On Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    );
  });

  it("should be able to comment on a answer", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId("answer-1"));

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: "This is a comment",
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(inMemoryAnswerCommentsRepository?.items[0]?.content).toEqual(
        "This is a comment",
      );
    }
  });
});
