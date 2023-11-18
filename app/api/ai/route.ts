export async function GET() {

    return Response.json({message: "Hel"});
  }

  export async function POST() {
    try {

      return Response.json({post:"post"});
    } catch (error) {
      return Response.json(error, {
        status: 400,
      });
    }
  }