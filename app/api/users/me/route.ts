import { NextResponse } from "next/server";

const generateMockUserProfile = () => {
  return {
    id: 1,
    username: "astute lee",
    profileImage: "https://picsum.photos/seed/123/100/100",
    fullName: "astute lee",
    email: "user@example.com",
    age: 28,
  };
};

export async function GET() {
  try {
    const userProfile = generateMockUserProfile();

    return NextResponse.json(userProfile, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user profile", error },
      { status: 500 }
    );
  }
}
