"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./user-item";

interface FollowingsProps {
    data: (Follow & { following: User & { stream: { isLive: boolean } | null } })[];
}
function Followings({ data }: FollowingsProps) {
    const { collapsed } = useSidebar((state) => state);

    if (!data.length) return null;

    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Followings</p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <UserItem
                        key={follow.following.id}
                        username={follow.following.username}
                        imageUrl={follow.following.imageUrl}
                        isLive={follow.following.stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    );
}

export const FollowingsSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index} />
            ))}
        </ul>
    );
};

export default Followings;
