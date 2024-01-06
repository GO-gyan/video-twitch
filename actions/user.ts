"use server";

import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const updateUser = async (values: Partial<User>) => {
    const self = await getSelf();
    const validData = {
        bio: values.bio,
    };
    const updatedUser = await db.user.update({
        where: {
            id: self.id
        },
        data: {
            ...validData
        }
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return updatedUser;
}