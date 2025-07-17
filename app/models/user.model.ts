import { prisma } from "~/db.server";

const getUsers = async () => {
  return await prisma.user.findMany({ include: { posts: true } });
};

const createUser = async (params: { name: string; email: string }) => {
  const { name, email } = params;
  return await prisma.user.create({ data: { name: name, email: email } });
};

export { getUsers, createUser };
