import { randomUUID } from "node:crypto";

interface QuestionProps {
  title: string;
  content: string;
  slug: string;
  authorId: string;
}

export class Question {
  public id: string;
  public title: string;
  public slug: string;
  public content: string;
  public authorId: string;

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID();
    this.title = props.title;
    this.slug = props.slug;
    this.content = props.content;
    this.authorId = props.authorId;
  }
}
