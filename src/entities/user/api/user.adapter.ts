import { ApiClient } from "@/shared/api/api";
import { UserDto, UserProfileDto } from "../dto";

export const UserAdapter = (apiClient: ApiClient) => ({
  getProfile: async (): Promise<UserProfileDto> => {
    return await apiClient
      .get<UserDto>(`/users/me`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("User Profile Error: ", error);
        return error;
      });
  },
});
