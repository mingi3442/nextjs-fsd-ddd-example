import { UserProfileDto } from "@/entities/user/infrastructure/dto";

export interface UserUseCase {
  getUserProfile: () => Promise<UserProfileDto>;
}
