export abstract class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this.validate(value);
    this._value = this.deepFreeze(value);
  }

  private deepFreeze<U>(obj: U): U {
    if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
      Object.freeze(obj);

      Object.getOwnPropertyNames(obj).forEach((prop) => {
        // @ts-expect-error - Resolving index signature issue (TypeScript requires index signatures when accessing arbitrary object properties)
        const value = obj[prop];

        if (
          value !== null &&
          (typeof value === "object" || typeof value === "function") &&
          !Object.isFrozen(value)
        ) {
          this.deepFreeze(value);
        }
      });
    }

    return obj;
  }

  protected abstract validate(value: T): void;

  public equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (other.constructor !== this.constructor) {
      return false;
    }

    return this.equalsValue(other._value);
  }

  protected equalsValue(value: T): boolean {
    if (typeof this._value === "object" && this._value !== null) {
      return JSON.stringify(this._value) === JSON.stringify(value);
    }
    return this._value === value;
  }

  public get value(): T {
    return this._value;
  }
}
