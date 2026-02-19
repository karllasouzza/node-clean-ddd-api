import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { CreateQuestionUseCase } from "./create-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// SUT = System Under Test
let sut: CreateQuestionUseCase;

describe("Create Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("should create a question", async () => {
    const result = await sut.execute({
      authorId: "author-1",
      title: "This is the question title",
      content: "This is the question content",
      attachmentsIds: ["attachment-1", "attachment-2"],
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      const { question } = result.value;
      expect(question.id).toBeDefined();

      // Testando os attachments
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
          attachmentId: new UniqueEntityId("attachment-2"),
        }),
      ]);
    }
  });
});
