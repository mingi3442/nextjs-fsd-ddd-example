import { UserUseCase } from "../usecase/user.usecase";
import { createUseUserProfile } from "./useUserProfile";

export const createUserHooks = (userUseCase: UserUseCase) => {
  return {
    useUserProfile: createUseUserProfile(userUseCase),
  };
};
