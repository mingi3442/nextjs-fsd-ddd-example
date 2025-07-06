import { UserApiRepository } from "@/entities/user/infrastructure/repository";
import { UserService } from "@/features/user/services/user.service";
import { apiClient } from "@/shared/api";

export const createUserService = () => {
  const repository = new UserApiRepository(apiClient);
  return UserService(repository);
};
