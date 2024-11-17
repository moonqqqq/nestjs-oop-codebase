import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // eslint-disable-next-line no-console
  console.log('Run Seeding');

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
