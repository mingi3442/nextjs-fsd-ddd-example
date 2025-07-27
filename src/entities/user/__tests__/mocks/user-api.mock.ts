import { ErrorMessages, HttpMocks, HttpStatus } from "@/shared/libs/__tests__";
import { UserEntity } from "../../types/user.types";

/**
 * User API 모킹 유틸리티
 */
export const UserApiMocks = {
  /**
   * 사용자 조회 API 모킹
   */
  getUser: (user: UserEntity) => HttpMocks.get(user),

  /**
   * 사용자 목록 조회 API 모킹
   */
  getUsers: (users: UserEntity[]) => HttpMocks.get(users),

  /**
   * 사용자 생성 API 모킹
   */
  createUser: (user: UserEntity) => HttpMocks.post(user, HttpStatus.CREATED),

  /**
   * 사용자 수정 API 모킹
   */
  updateUser: (user: UserEntity) => HttpMocks.put(user),

  /**
   * 사용자 삭제 API 모킹
   */
  deleteUser: () => HttpMocks.delete(),

  /**
   * 사용자명 중복 확인 API 모킹
   */
  checkUsername: (available: boolean) => HttpMocks.get({ available }),

  /**
   * 이메일 중복 확인 API 모킹
   */
  checkEmail: (available: boolean) => HttpMocks.get({ available }),

  /**
   * 사용자 프로필 조회 API 모킹
   */
  getUserProfile: (user: UserEntity) => HttpMocks.get(user),

  /**
   * 에러 시나리오 모킹
   */
  errors: {
    /**
     * 사용자 없음 에러
     */
    notFound: () =>
      HttpMocks.error(ErrorMessages.NOT_FOUND, HttpStatus.NOT_FOUND),

    /**
     * 인증 에러
     */
    unauthorized: () =>
      HttpMocks.error(ErrorMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED),

    /**
     * 권한 에러
     */
    forbidden: () =>
      HttpMocks.error(ErrorMessages.FORBIDDEN, HttpStatus.FORBIDDEN),

    /**
     * 잘못된 요청 에러
     */
    badRequest: () =>
      HttpMocks.error(ErrorMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST),

    /**
     * 중복 사용자 에러
     */
    conflict: () => HttpMocks.error("User already exists", HttpStatus.CONFLICT),

    /**
     * 유효성 검증 에러
     */
    validation: () =>
      HttpMocks.error("Invalid user data", HttpStatus.UNPROCESSABLE_ENTITY),

    /**
     * 서버 에러
     */
    serverError: () =>
      HttpMocks.error(
        ErrorMessages.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      ),

    /**
     * 네트워크 에러
     */
    networkError: () => HttpMocks.networkError(),

    /**
     * 타임아웃 에러
     */
    timeout: () => HttpMocks.timeoutError(),
  },
};
