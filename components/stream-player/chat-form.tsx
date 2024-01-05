"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import ChatInfo from "./chat-info";

interface ChatFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isDelayed: boolean;
    isFollowing: boolean;
}
function ChatForm({ value, onChange, onSubmit, isHidden, isFollowersOnly, isDelayed, isFollowing }: ChatFormProps) {
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!value || isDisabled) return;
        if (isDelayed && !isDelayBlocked) {
            setIsDelayBlocked(true);
            setTimeout(() => {
                setIsDelayBlocked(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        }
    };

    if (isHidden) {
        return null;
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-3">
            <div className="w-full">
                <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isDisabled}
                    placeholder="Type your message"
                    className={cn("border-white/10", isFollowersOnly && "rounded-t-none border-t-0")}
                />
            </div>
            <div className="ml-auto">
                <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
                    Send
                </Button>
            </div>
        </form>
    );
}

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="w-full h-10" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="w-7 h-7" />
                <Skeleton className="w-12 h-7" />
            </div>
        </div>
    );
};

export default ChatForm;
