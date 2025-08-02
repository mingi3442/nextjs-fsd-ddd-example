import { ErrorMessages, HttpMocks, HttpStatus } from "@/shared/libs/__tests__";
import { UserEntity } from "../../types/user.types";

export const UserApiMocks = {
  getUser: (user: UserEntity) => HttpMocks.get(user),

  getUsers: (users: UserEntity[]) => HttpMocks.get(users),

  createUser: (user: UserEntity) => HttpMocks.post(user, HttpStatus.CREATED),

  updateUser: (user: UserEntity) => HttpMocks.put(user),

  deleteUser: () => HttpMocks.delete(),

  checkUsername: (available: boolean) => HttpMocks.get({ available }),

  checkEmail: (available: boolean) => HttpMocks.get({ available }),

  getUserProfile: (user: UserEntity) => HttpMocks.get(user),

  errors: {
    notFound: () =>
      HttpMocks.error(ErrorMessages.NOT_FOUND, HttpStatus.NOT_FOUND),

    unauthorized: () =>
      HttpMocks.error(ErrorMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED),

    forbidden: () =>
      HttpMocks.error(ErrorMessages.FORBIDDEN, HttpStatus.FORBIDDEN),

    badRequest: () =>
      HttpMocks.error(ErrorMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST),

    conflict: () => HttpMocks.error("User already exists", HttpStatus.CONFLICT),

    validation: () =>
      HttpMocks.error("Invalid user data", HttpStatus.UNPROCESSABLE_ENTITY),

    serverError: () =>
      HttpMocks.error(
        ErrorMessages.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      ),

    networkError: () => HttpMocks.networkError(),

    timeout: () => HttpMocks.timeoutError(),
  },
};
