export abstract class ValueObject<T> {
  protected readonly _value: T

  constructor(value: T) {
    this.validate(value)
    this._value = Object.freeze(value)
  }

  protected abstract validate(value: T): void

  public equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false
    }

    if (other.constructor !== this.constructor) {
      return false
    }

    return this.equalsValue(other._value)
  }

  protected equalsValue(value: T): boolean {
    if (typeof this._value === "object" && this._value !== null) {
      return JSON.stringify(this._value) === JSON.stringify(value)
    }
    return this._value === value
  }

  public get value(): T {
    return this._value
  }
}