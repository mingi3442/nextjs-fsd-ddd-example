import { PostDto } from "@/entities/post/dto";
import { getRandomDate } from "@/shared/libs/date";
import { NextResponse } from "next/server";

const generateMockPosts = (count: number = 24): PostDto[] => {
  const posts: PostDto[] = [];
  for (let i = 1; i <= count; i++) {
    posts.push({
      id: i.toString(),
      user: {
        id: i.toString(),
        username: `Post_User_${i}`,
        profileImage: `https://picsum.photos/seed/${i + 200}/50/50`,
      },
      title: `Post Title ${i}`,
      body: `Hello! Sharing a special moment today. #Daily #Memory #HappyMoment`,
      image: `https://picsum.photos/seed/${i}/400/300`,
      likes: Math.floor(Math.random() * 1000),
      totalComments: Math.floor(Math.random() * 100),
      createdAt: getRandomDate(),
      updatedAt: getRandomDate(),
    });
  }
  return posts;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    const count = limit ? parseInt(limit) : 24;
    const posts = generateMockPosts(count);

    return NextResponse.json(
      { data: posts },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to generate posts", error },
      { status: 500 }
    );
  }
}
