import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { AnswerQuestionUseCase } from "./answer-question.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Question Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should create an answer", async () => {
    const questionId = "question-1";
    const instructorId = "instructor-1";
    const content = "This is the answer to the question.";

    const result = await sut.execute({
      questionId,
      instructorId,
      content,
    });
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      const { answer } = result.value;
      expect(answer.id).toBeDefined();
      expect(inMemoryAnswersRepository.items).toHaveLength(1);
      expect(inMemoryAnswersRepository.items[0]!.id).toBe(answer.id);

      // Verify that the answer was created with the correct data
      expect(answer.questionId.toString()).toBe(questionId);
      expect(answer.content).toBe(content);

      const storedAnswer = inMemoryAnswersRepository.items[0]!;
      expect(storedAnswer.questionId.toString()).toBe(questionId);
      expect(storedAnswer.content).toBe(content);
    }
  });
});
