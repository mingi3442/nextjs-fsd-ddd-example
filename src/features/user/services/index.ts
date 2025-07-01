import { UserApiRepository } from "@/entities/user/repository";
import { UserService } from "@/features/user/services/user.service";
import { apiClient } from "@/shared/api";

const createUserService = () => {
  const repository = new UserApiRepository(apiClient);
  return UserService(repository);
};

export const userService = createUserService();
