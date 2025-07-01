import { User } from "./user.domain";

export class UserFactory {
  static createNew(
    username: string,
    image: string = "",
    age: number = 0,
    email: string = ""
  ): User {
    return new User("", username, image, age, email);
  }

  static createNewWithProfile(
    username: string,
    image: string = "",
    age: number = 0,
    email: string = ""
  ): User {
    return new User("", username, image, age, email);
  }
}
