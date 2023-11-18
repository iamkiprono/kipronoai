import prisma from "@/prisma/client";
// get all posts with user info
export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return Response.json(posts);
}
