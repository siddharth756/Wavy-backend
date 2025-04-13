import connectDB from "../connectDB";
import { getTrackById } from "../../../controller/trackController";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    return getTrackById(req, res);
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
