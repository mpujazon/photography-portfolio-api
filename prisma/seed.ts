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
      layoutType: 'MASONRY',
      orderIndex: 1,
      isPublished: true,
    },
    create: {
      title: 'Street Photography',
      slug: 'street-photography',
      description: 'A collection of urban and street photography.',
      layoutType: 'MASONRY',
      orderIndex: 1,
      isPublished: true,
    },
  });

  await prisma.album.upsert({
    where: {
      slug: 'portrait-studies',
    },
    update: {
      title: 'Portrait Studies',
      description: 'A minimal portrait photography album.',
      layoutType: 'GRID',
      orderIndex: 2,
      isPublished: false,
    },
    create: {
      title: 'Portrait Studies',
      slug: 'portrait-studies',
      description: 'A minimal portrait photography album.',
      layoutType: 'GRID',
      orderIndex: 2,
      isPublished: false,
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
      layoutType: 'CAROUSEL',
      orderIndex: 3,
      isPublished: true,
    },
    create: {
      title: 'Landscape Escapes',
      slug: 'landscape-escapes',
      description:
        'Wide outdoor scenes focused on natural light and open spaces.',
      layoutType: 'CAROUSEL',
      orderIndex: 3,
      isPublished: true,
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
      layoutType: 'MASONRY',
      orderIndex: 4,
      isPublished: true,
    },
    create: {
      title: 'Black And White',
      slug: 'black-and-white',
      description:
        'Monochrome photographs with strong contrast and graphic composition.',
      layoutType: 'MASONRY',
      orderIndex: 4,
      isPublished: true,
    },
  });
}

async function seedSiteConfig() {
  const entries = [
    { key: 'brandLine1', value: 'LENS' },
    { key: 'brandBy', value: 'BY' },
    { key: 'brandLine2', value: 'MIKE' },
    { key: 'heroLabel', value: 'Street & Sports Photographer / Barcelona, ES' },
    { key: 'heroSubtitle', value: 'Photographs by Miguel Pujazón Cárdenas' },
    {
      key: 'heroParagraph',
      value:
        'I shoot motion and the street — the heat off a MotoGP straight, the lean of a classic bike at Montjuïc, the half-second a city gives you on a corner. No staging, no retouching beyond the grade. Just the frame I caught.',
    },
  ];

  for (const entry of entries) {
    await prisma.siteConfig.upsert({
      where: { key: entry.key },
      update: {},
      create: entry,
    });
  }
}

main()
  .then(async () => {
    await seedSiteConfig();
    console.log('Seed completed');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
