const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = '';
    if (file.fieldname === 'albumImage') folder = 'Wavy/albumImages';
    if (file.fieldname === 'trackImage') folder = 'Wavy/trackImages';
    if (file.fieldname === 'audio') folder = 'Wavy/audio';
    
    return {
      folder,
      resource_type: 'auto', // handles images/audio
    };
  },
});
export const upload = multer({ storage });
