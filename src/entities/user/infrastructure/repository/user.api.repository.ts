import { User, UserRepository } from "@/entities/user/core";
import { UserAdapter } from "@/entities/user/infrastructure/api";
import { UserMapper } from "@/entities/user/mapper";
import { ApiClient } from "@/shared/api";

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
