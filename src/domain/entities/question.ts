import { Entity } from "../core/entities/entity.js";
import type { UniqueEntityId } from "../core/entities/unique-entity-id.js";
import type { Optional } from "../core/types/optional.js";
import dayjs from "dayjs";
import { Slug } from "./values-objects/slug.js";

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId | undefined;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date | undefined;
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew() {
    return dayjs().diff(this.createdAt, "day") <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(editedTitle: string) {
    this.props.title = editedTitle;
    this.props.slug = Slug.createFromText(editedTitle);
    this.touch();
  }

  set content(editedContent: string) {
    this.props.content = editedContent;
    this.touch();
  }

  set bestAnswerId(editedBestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = editedBestAnswerId;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityId,
  ) {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    );
  }
}
