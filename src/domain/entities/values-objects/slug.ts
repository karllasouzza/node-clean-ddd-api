export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalize it a slug.
   *
   * Example: "Hello World!" => "hello-world"
   *
   * @param text {string} The text to be normalized as slug.
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize("NFD") // Normalize the string to decompose accented characters
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "");

    return new Slug(slugText);
  }
}
