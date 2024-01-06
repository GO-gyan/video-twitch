"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import Hint from "@/components/hint";
import { Trash } from "lucide-react";

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

function InfoModal({ initialName, initialThumbnailUrl }: InfoModalProps) {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success("Thumbnail removed");
                    setThumbnailUrl("");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("something went wrong"));
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    toast.success("Stream info updated");
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
                    <DialogTitle>Edit your stream info</DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Stream name" onChange={onChange} value={name} disabled={isPending} />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Remove thumbnail" asChild side="left">
                                        <Button
                                            type="button"
                                            onClick={onRemove}
                                            disabled={isPending}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image fill src={thumbnailUrl} alt="thumbnail" className="object-cover" />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    endpoint="thumbnailUploader"
                                    appearance={{
                                        label: {
                                            color: "#FFFFFF",
                                        },
                                        allowedContent: {
                                            color: "#FFFFFF",
                                        },
                                    }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnailUrl(res?.[0]?.url);
                                        router.refresh();
                                        closeRef?.current?.click();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="primary" disabled={isPending}>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default InfoModal;
