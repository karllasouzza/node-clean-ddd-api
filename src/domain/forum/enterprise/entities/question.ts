import dayjs from "dayjs";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import type { Optional } from "@/core/types/optional.js";
import { Slug } from "./values-objects/slug.js";
import { AggregateRoot } from "@/core/entities/aggregate-root.js";
import type { QuestionAttachment } from "./question-attachment.js";
import { QuestionAttachmentList } from "./question-attachment-list.js";

export interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId | undefined;
  attachments: QuestionAttachmentList
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date | undefined;
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get attachments() {
    return this.props.attachments
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

  set attachments(editedAttachments: QuestionAttachmentList) {
    this.props.attachments = editedAttachments;
  }

  set bestAnswerId(editedBestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = editedBestAnswerId;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
    id?: UniqueEntityId,
  ) {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
