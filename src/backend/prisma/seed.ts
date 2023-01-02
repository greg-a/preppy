import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const greg = await prisma.user.upsert({
    where: { email: "greg@prisma.io" },
    update: {},
    create: {
      email: "greg@prisma.io",
      name: "Greg",
      password: "test123",
      shoppingLists: {
        create: [
          { name: "grocery store", description: "this is for acme or target" },
        ],
      },
      items: {
        create: [{ name: "ice cream" }],
      },
    },
  });
  const anne = await prisma.user.upsert({
    where: { email: "anne@prisma.io" },
    update: {},
    create: {
      email: "anne@prisma.io",
      name: "Anne",
      password: "test123",
      shoppingLists: {
        create: [{ name: "trader joe's" }],
      },
      items: {
        create: [
          {
            name: "milk",
            description: "almond milk or cashew milk",
            category: "grocery",
            note: "we need this by tomorrow morning",
          },
        ],
      },
    },
  });
  console.log({ greg, anne });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
