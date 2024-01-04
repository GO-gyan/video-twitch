"use client";

import { ConnectionState, Track } from "livekit-client";
import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";
import OfflineVideo from "./offline-video";
import LoadingVideo from "./loading-video";
import LiveVideo from "./live-video";

interface VideoProps {
    hostName: string;
    hostIdentity: string;
}
function Video({ hostName, hostIdentity }: VideoProps) {
    const connectionState = useConnectionState();
    const participants = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
        (track) => track.participant.identity === hostIdentity
    );

    let content;

    if (!participants && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName} />;
    } else if (!participants || tracks.length === 0) {
        content = <LoadingVideo label={connectionState} />;
    } else {
        content = <LiveVideo participant={participants} />;
    }
    return <div className="aspect-video border-b group relative">{content}</div>;
}

export default Video;
