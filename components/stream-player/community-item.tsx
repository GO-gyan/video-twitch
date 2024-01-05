"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import Hint from "@/components/hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CommunityItemProps {
    participantName?: string;
    participantIdentity: string;
    viewerName: string;
    hostName: string;
}

function CommunityItem({ participantName, participantIdentity, viewerName, hostName }: CommunityItemProps) {
    const [isPending, startTransition] = useTransition();
    const color = stringToColor(participantName || "");
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) return;
        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`You are now blocking ${participantName}`))
                .catch(() => toast.error("something went wrong"));
        });
    };
    return (
        <div
            className={cn(
                "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
                isPending && "opacity-50 pointer-events-none"
            )}
        >
            <p style={{ color: color }}>{participantName}</p>
            {isHost && !isSelf && (
                <Hint label="Kick" asChild>
                    <Button
                        disabled={isPending}
                        onClick={handleBlock}
                        variant="ghost"
                        className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                        <MinusCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </Hint>
            )}
        </div>
    );
}

export default CommunityItem;
