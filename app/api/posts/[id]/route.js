import {connectMongo,postModel} from "../../../../utils/connectMongo";

// Named export for the GET method
export async function GET(req, {params}) {
    try {
        console.log(params);
        
        await connectMongo(); // Connect to MongoDB
        const postData = await postModel.findOne({_id: params.id}); // Fetch post
        return Response.json(postData)
    } catch (error) {
        console.error('Error fetching posts:', error);
        return Response.json({messageee:error.message});
    }
}
// Ensure you import ObjectId for handling MongoDB _id

// Handle DELETE request (Delete post by ID)
export async function DELETE(req, { params }) {
    try {
        await connectMongo(); // Connect to MongoDB

        // Find the post and delete it by ID
        const deletedPost = await postModel.deleteOne({ _id:params.id });
        // Return a 204 status without a response body
        return Response.json(deletedPost);
    } catch (error) {
        console.error('Error deleting post:', error);
        return Response.json({ message: error.message });
    }
}
