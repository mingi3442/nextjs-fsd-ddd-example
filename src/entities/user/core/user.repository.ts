import { User } from "@/entities/user/core/user.domain";

export interface UserRepository {
  getUserProfile(): Promise<User>;
}
