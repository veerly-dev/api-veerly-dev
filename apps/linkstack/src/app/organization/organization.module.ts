import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [OrganizationResolver, OrganizationService],
  imports: [PrismaModule],
})
export class OrganizationModule {}
