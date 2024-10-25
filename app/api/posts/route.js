import { connectMongo, postModel } from "../../../utils/connectMongo";

// Named export for the GET method
export async function GET(req) {
  const query = req.nextUrl.searchParams.get("q");
  try {
    await connectMongo(); // Connect to MongoDB
    let postData;
    if (query) {
      postData = await postModel.find({
        $or: [
          { title: new RegExp(query, "i") },
          { description: new RegExp(query, "i") },
        ],
      });
    } else {
      postData = await postModel.find({}); // Fetch all posts
    }
    return Response.json(postData);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json({ messageee: error.message });
  }
}
export async function POST(req) {
  try {
    const { title, description, image, created_at } = await req.json();
    const post = { title, description, image, created_at };
    await connectMongo();
    await postModel.create(post);
    return Response.json({ message: "Post has been successfully added!" });
  } catch (error) {
    return Response.json({ message: error._message });
  }
}

// Named export for the DELETE method
export async function DELETE(req) {
  try {
    const postId = req.nextUrl.searchParams.get("id");
    await connectMongo();
    await postModel.findByIdAndDelete(postId);
    return Response.json({ message: "Post deleted successfully!" });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
