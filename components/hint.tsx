import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HintProps {
    label: string;
    children: React.ReactNode;
    asChild: boolean;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}
function Hint({ label, children, asChild, side, align }: HintProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align} className="text-black bg-white">
                    <p className="font-semibold">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default Hint;
