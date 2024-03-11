"use server";

import { db } from "@/lib/db";

export const follow = async (currentUserId: string, followUserId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: currentUserId,
    },
    include: {
      following: {
        where: {
          id: followUserId,
        },
      },
    },
  });
  if (user!.following.length > 0) {
    await db.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        following: {
          disconnect: {
            id: followUserId,
          },
        },
      },
    });

    await db.user.update({
      where: {
        id: followUserId,
      },
      data: {
        followers: {
          disconnect: {
            id: currentUserId,
          },
        },
      },
    });

    return { follow: false };
  }

  await db.user.update({
    where: {
      id: currentUserId,
    },
    data: {
      following: {
        connect: {
          id: followUserId,
        },
      },
    },
  });

  await db.user.update({
    where: {
      id: followUserId,
    },
    data: {
      followers: {
        connect: {
          id: currentUserId,
        },
      },
    },
  });

  return { follow: true };
};

export const isFollowing = async (
  currentUserId: string,
  followUserId: string,
) => {
  const user = await db.user.findUnique({
    where: {
      id: currentUserId,
    },
    include: {
      following: {
        where: {
          id: followUserId,
        },
      },
    },
  });
  if (user!.following.length > 0) {
    return { following: true };
  }
  return { following: false };
};
