export class UniqueEntityId {
  private readonly _value: string;

  constructor(id?: string) {
    this._value = id ?? crypto.randomUUID();
  }

  toValue(): string {
    return this._value;
  }

  toString() {
    return this._value;
  }
}
