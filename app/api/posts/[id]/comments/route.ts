import { CommentDto } from "@/entities/comment/dto";
import { getRandomDate } from "@/shared/libs/date";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;

    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    const comments = generateComments(postId, limit);

    return NextResponse.json(
      {
        data: comments,
        pagination: {
          total: comments.length,
          page: 1,
          limit: limit,
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching comments for post ID ${postId}:", error);
    return NextResponse.json(
      { error: "Server error occurred." },
      { status: 500 }
    );
  }
}

const generateComments = (postId: string, count: number): CommentDto[] => {
  const comments: CommentDto[] = [];
  for (let i = 1; i <= count; i++) {
    comments.push({
      id: i.toString(),
      body: getRandomComment(),
      user: {
        id: (i + 100).toString(),
        username: `Comment_User_${i}`,
        profileImage: `https://picsum.photos/seed/${i + 100}/40/40`,
      },
      postId: postId,
      createdAt: getRandomDate(),
      likes: 0,
    });
  }
  return comments;
};

const getRandomComment = (): string => {
  const comments = [
    "Nice photo! 👍",
    "Wow! I really like it 😍",
    "Where is this place?",
    "I want to visit there too!",
    "The atmosphere looks so good",
    "Have a nice day today ☺️",
    "Thank you for always sharing great posts",
    "Looking forward to your next post!",
    "It's so beautiful 💕",
    "Thanks for sharing~",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
};
