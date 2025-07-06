import { userUsecase } from "../services";
import { createUserHooks } from "./user.hooks.factory";

export const { useUserProfile } = createUserHooks(userUsecase);
