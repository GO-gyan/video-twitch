"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";

import Hint from "@/components/hint";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
    value: number;
    onChange: (value: number) => void;
    onToggle: () => void;
}

function VolumeControl({ value, onChange, onToggle }: VolumeControlProps) {
    const isMuted = value === 0;
    const isAboveHalf = value > 50;

    let Icon = Volume1;

    if (isMuted) {
        Icon = VolumeX;
    } else if (isAboveHalf) {
        Icon = Volume2;
    }

    const label = isMuted ? "Unmute" : "Mute";

    const handleChange = (value: number[]) => {
        onChange(value[0]);
    };
    return (
        <div className="flex items-center gap-2">
            <Hint label={label} asChild>
                <button onClick={onToggle} className="text-white p-1.5 hover:bg-white/10 rounded-lg">
                    <Icon className="h-5 w-5" />
                </button>
            </Hint>
            <Slider
                value={[value]}
                onValueChange={handleChange}
                min={0}
                max={100}
                step={1}
                className="w-[8rem] cursor-pointer"
            />
        </div>
    );
}

export default VolumeControl;
