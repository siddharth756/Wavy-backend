// api/albums/[id]/tracks.js
import connectDB from '../../connectDB';
import { getTracksByAlbumId } from '../../../controller/albumController';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    return getTracksByAlbumId(req, res);
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
