import { USER_QUERY_KEYS } from "@/entities/user/infrastructure/api";
import { UserProfileDto } from "@/entities/user/infrastructure/dto";
import { userService } from "@/features/user/services";
import { BaseError } from "@/shared/libs/errors";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  return useSuspenseQuery<UserProfileDto>({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: async () => {
      try {
        return await userService.getUserProfile();
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
