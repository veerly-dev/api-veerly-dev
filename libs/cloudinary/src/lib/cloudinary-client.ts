import { v2 as cloudinary } from 'cloudinary';

const cloudinaryCloudName = process.env['CLOUDINARY_CLOUD_NAME'];
if (!cloudinaryCloudName) {
  throw new Error(
    'CLOUDINARY_CLOUD_NAME is not defined in environment variables'
  );
}
const cloudinaryAPIKey = process.env['CLOUDINARY_API_KEY'];
if (!cloudinaryAPIKey) {
  throw new Error('CLOUDINARY_API_KEY is not defined in environment variables');
}
const cloudinaryAPISecret = process.env['CLOUDINARY_API_SECRET'];
if (!cloudinaryAPISecret) {
  throw new Error('CLOUDINARY_API_KEY is not defined in environment variables');
}

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryAPIKey,
  api_secret: cloudinaryAPISecret,
});

export default cloudinary;
