import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "test/factories/make-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { CommentOnQuestionUseCase } from "./comment-on-question.js";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
// SUT = System Under Test
let sut: CommentOnQuestionUseCase;

describe("Comment On Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  it("should be able to comment on a question", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      content: "This is a comment",
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(inMemoryQuestionCommentsRepository?.items[0]?.content).toEqual(
        "This is a comment",
      );
    }
  });
});
