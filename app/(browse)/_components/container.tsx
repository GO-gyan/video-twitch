"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
}
function Container({ children }: ContainerProps) {
    const matches = useMediaQuery("(min-width: 1024px)");
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

    useEffect(() => {
        if (matches) {
            onExpand();
        } else {
            onCollapse();
        }
    }, [matches, onCollapse, onExpand]);
    return <div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>{children}</div>;
}

export default Container;
