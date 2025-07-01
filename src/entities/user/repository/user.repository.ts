import { UserAdapter } from "@/entities/user/api";
import { UserMapper } from "@/entities/user/core";
import { User } from "@/entities/user/core/user.domain";
import { ApiClient } from "@/shared/api";

export interface UserRepository {
  getUserProfile(): Promise<User>;
}

export class UserApiRepository implements UserRepository {
  private api: ReturnType<typeof UserAdapter>;
  constructor(apiClient: ApiClient) {
    this.api = UserAdapter(apiClient);
  }

  async getUserProfile(): Promise<User> {
    try {
      const response = await this.api.getProfile();
      const user = UserMapper.toDomainFromProfile(response);
      return user;
    } catch (error) {
      console.error("UserRepository getUserProfile Error:", error);
      throw error;
    }
  }
}
