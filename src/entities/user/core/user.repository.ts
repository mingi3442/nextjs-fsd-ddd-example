import { User } from "./user.domain";

export interface UserRepository {
  getUserProfile(): Promise<User>;
}
