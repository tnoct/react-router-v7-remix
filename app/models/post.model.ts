import { PrismaClient } from "~/generated/prisma/client";

const prisma = new PrismaClient();

async function getPosts() {
  return prisma.post.findMany({ include: { author: true } });
}

async function getPost(id: number) {
  return prisma.post.findUnique({ where: { id: id } });
}

export { getPosts, getPost };
