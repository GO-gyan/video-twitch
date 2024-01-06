"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
    initialValue: string | null;
}
function BioModal({ initialValue }: BioModalProps) {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [value, setValue] = useState(initialValue || "");
    const [isPending, startTransition] = useTransition();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateUser({ bio: value })
                .then(() => {
                    toast.success("User bio updated");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("something went wrong"));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user bio</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        placeholder="User bio"
                        value={value}
                        className="resize-none"
                        onChange={(e) => setValue(e.target.value)}
                        disabled={isPending}
                    />
                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button type="button" variant="ghost" size="sm">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} variant="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default BioModal;
