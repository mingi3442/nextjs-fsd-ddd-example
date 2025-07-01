import { UserProfileDto } from "@/entities/user/dto";
import { UserRepository } from "@/entities/user/repository";
import { BaseError } from "@/shared/libs/errors";
import { UserUseCase } from "../usecase/user.usecase";

export const UserService = (userRepository: UserRepository): UserUseCase => ({
  getUserProfile: async (): Promise<UserProfileDto> => {
    try {
      const result = await userRepository.getUserProfile();
      if (!result) {
        throw BaseError.notFound("User", "current");
      }
      return result;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw new BaseError("Failed to fetch user profile", "FetchError");
    }
  },
});
