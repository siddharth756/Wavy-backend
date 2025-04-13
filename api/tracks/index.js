import nextConnect from 'next-connect';
import connectDB from '../connectDB';
import { upload } from '../../middleware/multer'
import { postTrack } from '../../controller/trackController'

const handler = nextConnect()

handler.use(upload.fields([
    { name: 'trackImage', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ])).post(async (req,res) => {
    await connectDB()
    return postTrack(req,res)
  })