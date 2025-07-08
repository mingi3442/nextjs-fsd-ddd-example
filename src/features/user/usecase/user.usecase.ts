import { UserProfileDto } from "@/entities/user";

export interface UserUseCase {
  getUserProfile: () => Promise<UserProfileDto>;
}
