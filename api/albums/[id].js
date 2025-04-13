// api/albums/[id].js
import connectDB from '../connectDB';
import { getAlbumById } from '../../controller/albumController';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    return getAlbumById(req, res);
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
