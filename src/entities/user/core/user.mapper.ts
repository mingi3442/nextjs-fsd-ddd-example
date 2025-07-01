import { User } from "@/entities/user/core/user.domain";
import { UserDto, UserProfileDto } from "@/entities/user/dto";

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      username: user.username,
      profileImage: user.profileImage,
    };
  }

  static toProfileDto(user: User): UserProfileDto {
    return {
      id: user.id,
      username: user.username,
      profileImage: user.profileImage,
      age: user.age,
      email: user.email,
    };
  }

  static toDomain(dto: UserDto): User {
    return new User(dto.id, dto.username, dto.profileImage || "", 0, "");
  }

  static toDomainFromProfile(dto: UserProfileDto): User {
    return new User(
      dto.id,
      dto.username,
      dto.profileImage || "",
      dto.age || 0,
      dto.email || ""
    );
  }
}
