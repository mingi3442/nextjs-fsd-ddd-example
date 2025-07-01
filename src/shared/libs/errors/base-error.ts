export class BaseError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
  }

  static notFound(entity: string, id: string): BaseError {
    return new BaseError(`${entity} with ID ${id} not found`, "NotFoundError");
  }

  static unauthorized(
    entity: string,
    id: string,
    action: string = "modify"
  ): BaseError {
    return new BaseError(
      `You don't have permission to ${action} ${entity.toLowerCase()} with ID ${id}`,
      "UnauthorizedError"
    );
  }

  static createFailed(entity: string): BaseError {
    return new BaseError(
      `Failed to create ${entity.toLowerCase()}`,
      "CreateFailedError"
    );
  }

  static updateFailed(entity: string, id: string): BaseError {
    return new BaseError(
      `Failed to update ${entity.toLowerCase()} with ID ${id}`,
      "UpdateFailedError"
    );
  }

  static deleteFailed(entity: string, id: string): BaseError {
    return new BaseError(
      `Failed to delete ${entity.toLowerCase()} with ID ${id}`,
      "DeleteFailedError"
    );
  }

  static validation(message: string): BaseError {
    return new BaseError(message, "ValidationError");
  }
}
