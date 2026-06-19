import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.album.upsert({
    where: {
      slug: 'street-photography',
    },
    update: {
      title: 'Street Photography',
      description: 'A collection of urban and street photography.',
      orderIndex: 1,
      isPublished: true,
      isFeatured: true,
    },
    create: {
      title: 'Street Photography',
      slug: 'street-photography',
      description: 'A collection of urban and street photography.',
      orderIndex: 1,
      isPublished: true,
      isFeatured: true,
    },
  });

  await prisma.album.upsert({
    where: {
      slug: 'portrait-studies',
    },
    update: {
      title: 'Portrait Studies',
      description: 'A minimal portrait photography album.',
      orderIndex: 2,
      isPublished: false,
      isFeatured: false,
    },
    create: {
      title: 'Portrait Studies',
      slug: 'portrait-studies',
      description: 'A minimal portrait photography album.',
      orderIndex: 2,
      isPublished: false,
      isFeatured: false,
    },
  });

  await prisma.album.upsert({
    where: {
      slug: 'landscape-escapes',
    },
    update: {
      title: 'Landscape Escapes',
      description:
        'Wide outdoor scenes focused on natural light and open spaces.',
      orderIndex: 3,
      isPublished: true,
      isFeatured: false,
    },
    create: {
      title: 'Landscape Escapes',
      slug: 'landscape-escapes',
      description:
        'Wide outdoor scenes focused on natural light and open spaces.',
      orderIndex: 3,
      isPublished: true,
      isFeatured: false,
    },
  });

  await prisma.album.upsert({
    where: {
      slug: 'black-and-white',
    },
    update: {
      title: 'Black And White',
      description:
        'Monochrome photographs with strong contrast and graphic composition.',
      orderIndex: 4,
      isPublished: true,
      isFeatured: false,
    },
    create: {
      title: 'Black And White',
      slug: 'black-and-white',
      description:
        'Monochrome photographs with strong contrast and graphic composition.',
      orderIndex: 4,
      isPublished: true,
      isFeatured: false,
    },
  });
}

main()
  .then(async () => {
    console.log('Seed completed');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
