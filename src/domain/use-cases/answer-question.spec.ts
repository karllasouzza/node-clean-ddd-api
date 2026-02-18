import { describe, expect, it, vi } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question.js";

const fakeAnswersRepository = {
  create: vi.fn(),
};

describe.only("Answer Question Use Case", () => {
  it("should create an answer", async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

    const answer = await answerQuestion.execute({
      questionId: "question-1",
      instructorId: "instructor-1",
      content: "This is the answer to the question.",
    });

    expect(answer.content).toBe("This is the answer to the question.");
  });
});
