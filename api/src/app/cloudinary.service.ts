import { Injectable } from '@nestjs/common';
import cloudinary from './cloudinary-client';

export interface ImageFile {
  buffer: Buffer;
  mimetype?: string;
  originalname?: string;
}

@Injectable()
export class CloudinaryService {
  async uploadImage(file: ImageFile): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'my-farm',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            if (!result?.secure_url) {
              return reject(
                new Error('Cloudinary upload failed - no URL returned')
              );
            }

            resolve(result.secure_url);
          }
        )
        .end(file.buffer);
    });
  }
}
