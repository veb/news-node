const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const addLink = await prisma.link.create({
    data: {
      description: "Testing database",
      url: "https://google.com",
    },
  });

  const newLink = await prisma.link.create(addLink);
  console.log("newLink", newLink);

  const allLinks = await prisma.link.findMany();
  console.log("allLinks", allLinks);
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
