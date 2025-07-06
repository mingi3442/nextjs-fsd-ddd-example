import { PostDto } from "../infrastructure/dto";
import { UserReference } from "../types";
import { Post } from "./post.domain";

export class PostFactory {
  static createNew(
    title: string,
    body: string,
    user: UserReference,
    image: string = ""
  ): Post {
    return new Post(
      "",
      user,
      title,
      body,
      image,
      0,
      0,
      new Date().getTime(),
      new Date().getTime()
    );
  }

  static createFromDto(dto: PostDto): Post {
    return new Post(
      dto.id,
      dto.user,
      dto.title,
      dto.body,
      dto.image || "",
      dto.likes || 0,
      dto.totalComments || 0,
      dto.createdAt || new Date().getTime(),
      dto.updatedAt || new Date().getTime()
    );
  }
}
