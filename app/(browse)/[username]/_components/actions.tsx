"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

function Actions({ isFollowing, userId }: ActionsProps) {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch((err) => toast.error("something went wrong"));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You are no longer following ${data.following.username}`))
                .catch((err) => toast.error("something went wrong"));
        });
    };

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };
    return (
        <Button disabled={isPending} onClick={onClick} variant="primary">
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}

export default Actions;
