import prisma from "~/db.server";

async function getPosts() {
  return prisma.post.findMany({ include: { author: true } });
}

export { getPosts };
