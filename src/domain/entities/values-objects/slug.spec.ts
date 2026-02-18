import { describe, it } from "vitest";
import { Slug } from "./slug.js";

describe("Slug Value Object", () => {
  it("should create a slug from text", () => {
    const slug = Slug.createFromText("Hello World!");
    console.log(slug);
  });
});
