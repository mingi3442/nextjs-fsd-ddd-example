import { USER_QUERY_KEYS, UserProfileDto } from "@/entities/user";
import { BaseError } from "@/shared/libs/errors";
import { useQuery } from "@tanstack/react-query";
import { UserUseCase } from "../usecase/user.usecase";

export const createUseUserProfile = (userUseCase: UserUseCase) => {
  const useUserProfile = () => {
    return useQuery<UserProfileDto>({
      queryKey: USER_QUERY_KEYS.profile(),
      queryFn: async () => {
        try {
          return await userUseCase.getUserProfile();
        } catch (error) {
          if (error instanceof BaseError) {
            throw error;
          }
          throw new BaseError("Failed to fetch user profile", "FetchError");
        }
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  return useUserProfile;
};
