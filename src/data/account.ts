import { db } from "@/lib/db";

export const getAccountByUserId = async (id: string) => {
  const account = await db.account.findFirst({
    where: {
      userId: id,
    },
  });
  if (!account) return null;

  return account;
};
