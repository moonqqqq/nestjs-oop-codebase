import { PrismaClient } from '@prisma/client';
import { seedPatients } from './seed-datas/patient.seed';
import { seedBedsoreManagementGuides } from './seed-datas/bedsore-management-guide.seed';

const prisma = new PrismaClient();
async function main() {
  // eslint-disable-next-line no-console
  console.log('Run Seeding');

  // seed users
  await Promise.all(
    seedPatients.map((seedUser) =>
      prisma.patientEntity.create({
        data: seedUser,
      }),
    ),
  );

  // seed bedsore management guides
  await prisma.bedsoreManagementGuideEntity.createMany({
    data: seedBedsoreManagementGuides,
  });

  // eslint-disable-next-line no-console
  console.log('Seeding Done - added: [users, sticker]');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
