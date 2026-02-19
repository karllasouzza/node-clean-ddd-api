import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "test/factories/make-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer.js";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { makeAnswer } from "test/factories/make-answer.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
// SUT = System Under Test
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    );
  });

  it("should choose the best answer for a question", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId("question-1"));
    const newAnswer = makeAnswer(
      {
        questionId: newQuestion.id,
      },
      new UniqueEntityId("answer-1"),
    );

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(inMemoryQuestionsRepository?.items[0]?.bestAnswerId).toEqual(
        newAnswer.id,
      );
    }
  });

  it("should not able to choose the best answer if the authorId does not match", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("question-1"),
    );
    await inMemoryQuestionsRepository.create(newQuestion);

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-2"),
        questionId: newQuestion.id,
      },
      new UniqueEntityId("answer-1"),
    );
    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: "answer-1",
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(NotAllowedError);
    }
  });
});
