"use client";

import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { onFollow, onUnfollow } from "@/actions/follow";
import { cn } from "@/lib/utils";

interface ActionsProps {
    isFollowing: boolean;
    hostIdentity: string;
    isHost: boolean;
}

function Actions({ isFollowing, hostIdentity, isHost }: ActionsProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { userId } = useAuth();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch((err) => toast.error("something went wrong"));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You are no longer following ${data.following.username}`))
                .catch((err) => toast.error("something went wrong"));
        });
    };

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in");
        }

        if (isHost) return;

        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };
    return (
        <Button
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
            disabled={isPending || isHost}
        >
            <Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")} />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}
export const ActionsSkeleton = () => {
    return <Skeleton className="h-10 w-full lg:w-24" />;
};

export default Actions;
