import { Sex } from '@prisma/client';

export const seedPatients = [
  {
    name: 'kim',
    birthDate: '901213',
    sex: Sex.MALE,
    serialNumber: '12345',
  },
  {
    name: 'Lee',
    birthDate: '911213',
    sex: Sex.FEMALE,
    serialNumber: '12346',
  },
  {
    name: 'Park',
    birthDate: '951213',
    sex: Sex.MALE,
    serialNumber: '12347',
  },
];
