import { UserApiRepository } from "@/entities/user";
import { apiClient } from "@/shared/api";
import { UserService } from "./user.service";

export const createUserService = () => {
  const repository = new UserApiRepository(apiClient);
  return UserService(repository);
};
