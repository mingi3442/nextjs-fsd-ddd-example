import { UserProfileDto } from "@/entities/user/dto";

export interface UserUseCase {
  getUserProfile: () => Promise<UserProfileDto>;
}
