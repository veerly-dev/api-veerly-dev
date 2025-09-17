import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Setup Roles
  const roles = [
    { name: 'Admin', codeId: 101, description: 'Organization CTO' },
    {
      name: 'HR Manager',
      codeId: 102,
      description: 'Oraganization Human-Resource Manager',
    },
    {
      name: 'Accountant',
      codeId: 103,
      description: 'Oraganization Accountant',
    },
    {
      name: 'Lead',
      codeId: 104,
      description: 'Oraganization Team manager | Lead',
    },
    { name: 'Employee', codeId: 105, description: 'Oraganization Employee' },
    {
      name: 'Daily Labour',
      codeId: 106,
      description: 'Oraganization Daily wages labour',
    },
  ];
  for (const role of roles) {
    const existingRole = await prisma.role.findUnique({
      where: { name: role.name },
    });
    if (!existingRole) {
      await prisma.role.create({
        data: {
          name: role.name,
          codeId: role.codeId,
          description: role.description,
        },
      });
      console.log(`Created role: ${role}`);
    } else {
      console.log(`Role ${role} already exists`);
    }
  }

  // Check if Veerly exists
  let veerlyOrg = await prisma.organization.findFirst({
    where: { name: 'Veerly' },
  });

  if (!veerlyOrg) {
    veerlyOrg = await prisma.organization.create({
      data: {
        name: 'Veerly',
        type: 'Manufacturer',
      },
    });
    const adminRole = await prisma.role.findUnique({
      where: { name: 'Admin' },
    });
    if (!adminRole) {
      throw new Error('Admin role not found');
    }
    const adminUser = await prisma.user.create({
      data: {
        email: 'obulareddyveera@gmail.com',
        name: 'Veerly',
        password: 'securepassword', // In a real scenario, ensure to hash passwords
      },
    });
    await prisma.organizationMembership.create({
      data: {
        userId: adminUser.id,
        organizationId: veerlyOrg.id,
        role: adminRole.id,
      },
    });
    console.log('Created organization: Veerly');
  } else {
    console.log('Organization Veerly already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
