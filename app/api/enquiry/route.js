import { connectMongo, enquiryModel } from "../../../../utils/connectMongo";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    const enquiry = { name, email, message };
    await connectMongo();
    await enquiryModel.create(enquiry);
    return Response.json({ message: "Enquiry has been successfully sent!" });
  } catch (error) {
    return Response.json({ message: error._message });
  }
}
