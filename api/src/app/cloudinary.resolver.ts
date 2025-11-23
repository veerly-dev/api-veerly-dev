// api/src/app/cloudinary.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { CloudinaryService } from './cloudinary.service';

@Resolver()
export class UploadResolver {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Mutation(() => String)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<string> {
    const { createReadStream, filename, mimetype } = file;

    const buffers: Uint8Array[] = [];
    const stream = createReadStream();

    for await (const chunk of stream) {
      buffers.push(chunk);
    }

    const buffer = Buffer.concat(buffers);

    const imageUrl = await this.cloudinaryService.uploadImage({
      buffer,
      originalname: filename,
      mimetype,
    });

    return imageUrl;
  }
}
