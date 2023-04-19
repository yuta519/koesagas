import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
  const podcast = await prisma.podcast.create({
    data: {
      name: 'バンクーバーのえんじに屋',
      indexName: 'vancouver-engineers',
      imageUrl: 'https://content.production.cdn.art19.com/images/21/29/55/8c/2129558c-b1a7-4d6c-8ebe-9306ff147b76/bab81362790830baf24d2c8ef5055984a16f5b60d6227d9e2f834968bcd3f326b9a3d34a7f9d32150bd08cd9b0ad924c3de016e0d4203c34a1d9b8af2477d112.jpeg',
      createdAt: '2020-10-19T00:00:00Z',
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
