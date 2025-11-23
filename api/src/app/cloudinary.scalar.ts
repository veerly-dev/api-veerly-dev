import { Scalar } from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

@Scalar('Upload')
export class UploadScalar extends GraphQLScalarType {
  constructor() {
    super({
      ...GraphQLUpload,
      name: 'Upload',
    });
  }
}
