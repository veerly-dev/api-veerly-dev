import { Module } from '@nestjs/common';
import { UploadResolver } from './cloudinary.resolver';
import { CloudinaryService } from './cloudinary.service';

@Module({
  controllers: [],
  providers: [UploadResolver, CloudinaryService],
  exports: [],
})
export class CloudinaryModule {}
