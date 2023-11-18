import prisma from "@/prisma/client";

// get all authors with posts
export async function GET() {
  const authors = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  return Response.json(authors);
}
