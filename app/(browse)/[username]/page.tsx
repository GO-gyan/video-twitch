import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";

import Actions from "./_components/actions";
interface UserPageProps {
    params: {
        username: string;
    };
}
async function UserPage({ params }: UserPageProps) {
    const user = await getUserByUsername(params.username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    return (
        <div className="flex flex-col gap-y-4">
            <p>UserPage: {user.username}</p>
            <p>Following: {isFollowing ? "true" : "false"}</p>
            <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    );
}

export default UserPage;
