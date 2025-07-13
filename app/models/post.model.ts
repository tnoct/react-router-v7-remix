import { PrismaClient } from "~/generated/prisma/client";

const prisma = new PrismaClient();

async function getPosts() {
  return prisma.post.findMany({ include: { author: true } });
}

async function getPost(id: number) {
  return prisma.post.findUnique({
    where: { id: id },
    include: { author: true },
  });
}

async function createPost(title: string, content: string, published: boolean) {
  return prisma.post.create({
    data: { title, author: { connect: { id: 2 } }, content, published },
  });
}

async function updatePost(title: string, content: string, id: number) {
  return prisma.post.update({
    data: { title, author: { connect: { id: 2 } }, content },
    include: { author: true },
    where: { id: id },
  });
}

export { getPosts, getPost, createPost, updatePost };
