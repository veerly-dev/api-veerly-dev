import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { PrismaModule } from '@veerly-dev/prisma';
@Module({
  providers: [OrganizationResolver, OrganizationService],
  imports: [PrismaModule],
})
export class OrganizationModule {}
