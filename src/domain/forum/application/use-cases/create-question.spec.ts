import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { CreateQuestionUseCase } from "./create-question.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// SUT = System Under Test
let sut: CreateQuestionUseCase;

describe("Create Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("should create a question", async () => {
    const { question } = await sut.execute({
      authorId: "author-1",
      title: "This is the question title",
      content: "This is the question content",
    });

    expect(question.id).toBeDefined();
    expect(question.title).toBe("This is the question title");
    expect(question.content).toBe("This is the question content");
  });
});
