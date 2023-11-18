import prisma from "@/prisma/client";

export async function GET() {
  const users = await prisma.post.findMany();
  return Response.json(users);
}

export async function POST() {
  try {
    const user = await prisma.post.create({
      data: {
        title: "Prisma makes databases easy",
        author: {
          connect: {
            email: "kim@",
          },
        },
        content:
          "Prisma is a database toolkit that consists of these tools: Prisma Client: An auto-generated and type-safe query builder for Node.js & TypeScript",
        published: true,
      },
    });
    return Response.json(user);
  } catch (error) {
    return Response.json(error, {
      status: 400,
    });
  }
}
