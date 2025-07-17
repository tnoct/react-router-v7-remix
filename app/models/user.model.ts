import { prisma } from "~/db.server";

const getUsers = async () => {
  return await prisma.user.findMany({ include: { posts: true } });
};

const createUser = async (params: { name: string; email: string }) => {
  const { name, email } = params;
  return await prisma.user.create({ data: { name: name, email: email } });
};

const getUser = async (params: { id: number }) => {
  const { id } = params;
  return prisma.user.findUnique({ where: { id: id as number } });
};

const updateUser = async (params: {
  id: number;
  name: string;
  email: string;
}) => {
  const { id, email, name } = params;
  return prisma.user.update({
    where: { id: id },
    data: { email: email, name: name },
  });
};

async function deleteUser(params: { id: number }) {
  const { id } = params;
  return prisma.user.delete({ where: { id: id } });
}

export { getUsers, createUser, getUser, updateUser, deleteUser };
