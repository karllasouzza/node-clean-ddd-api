import { Entity } from "../core/entities/entity.js";
import type { UniqueEntityId } from "../core/entities/unique-entity-id.js";
import type { Optional } from "../core/types/optional.js";

interface StudentProps {
  name: string;
}
export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId) {
    return new Student(props, id);
  }
}
