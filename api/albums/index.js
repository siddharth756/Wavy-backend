// /api/albums/index.js
import nextConnect from 'next-connect';
import connectDB from '../connectDB';
import { getAlbums, postAlbum } from '../../controller/albumController';
import { upload } from '../../middleware/multer';

const handler = nextConnect();

handler.get(async (req, res) => {
  await connectDB();
  return getAlbums(req, res);
});

handler.use(upload.single('albumImage')).post(async (req, res) => {
  await connectDB();
  return postAlbum(req, res);
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Required for multer
  },
};
