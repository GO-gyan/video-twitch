import Wrapper from "./wrapper";
import Toggle, { ToggleSkeleton } from "./toggle";
import Recommended, { RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowedUsers } from "@/lib/follow-service";
import Followings, { FollowingsSkeleton } from "./followings";

async function Sidebar() {
    const recommended = await getRecommended();
    const followings = await getFollowedUsers();
    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Followings data={followings} />
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    );
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton />
            <FollowingsSkeleton />
            <RecommendedSkeleton />
        </aside>
    );
};

export default Sidebar;
