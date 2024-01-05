"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    viewerName: string;
    hostName: string;
    isHidden: boolean;
}

function ChatCommunity({ viewerName, hostName, isHidden }: ChatCommunityProps) {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce<string>(value, 500);

    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter((p) => p.name?.toLowerCase().includes(debouncedValue.toLowerCase()));
    }, [participants, debouncedValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Community is disabled</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">No results</p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                        viewerName={viewerName}
                        hostName={hostName}
                    />
                ))}
            </ScrollArea>
        </div>
    );
}

export default ChatCommunity;
