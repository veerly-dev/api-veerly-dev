import { v2 as cloudinary } from 'cloudinary';

const cloudinaryCloudName = process.env['CLOUDINARY_CLOUD_NAME'] || 'dnix97dic';
const cloudinaryAPIKey = process.env['CLOUDINARY_API_KEY'] || '787744844345457';
const cloudinaryAPISecret =
  process.env['CLOUDINARY_API_SECRET'] || 'Sq6jwrtVgJw9RO3wyFTbNGHypLM';

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryAPIKey,
  api_secret: cloudinaryAPISecret,
});

export default cloudinary;
