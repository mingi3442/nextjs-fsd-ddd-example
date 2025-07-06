import { createUseUserProfile } from "@/features/user/hooks/useUserProfile";
import { UserUseCase } from "@/features/user/usecase/user.usecase";

export const createUserHooks = (userUseCase: UserUseCase) => {
  return {
    useUserProfile: createUseUserProfile(userUseCase),
  };
};
