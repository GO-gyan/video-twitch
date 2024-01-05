"use client";

import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import UserAvatar from "@/components/user-avatar";
import VerifiedMark from "@/components/verified-mark";

interface HeaderProps {
    viewerIdentity: string;
    hostName: string;
    hostIdentity: string;
    isFollowing: boolean;
    imageUrl: string;
    name: string;
}

function Header({ viewerIdentity, hostName, hostIdentity, isFollowing, imageUrl, name }: HeaderProps) {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    const participantCount = participants.length - 1;

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar imageUrl={imageUrl} username={hostName} size="lg" isLive={isLive} showBadge />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-lg font-semibold">{hostName}</h2>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm font-semibold">{name}</p>
                    {isLive ? (
                        <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                            <UserIcon className="h-4 w-4" />
                            <p>
                                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
                            </p>
                        </div>
                    ) : (
                        <p className="text-xs font-semibold text-muted-foreground">Offline</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
