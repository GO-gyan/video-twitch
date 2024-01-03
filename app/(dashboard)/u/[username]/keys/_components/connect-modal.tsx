"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { AlertTriangle } from "lucide-react";

function ConnectModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">Generate connection</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate connection</DialogTitle>
                </DialogHeader>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="RTMP">RTMP</SelectItem>
                        <SelectItem value="WHIP">WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="w-4 h-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection.
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => {}} variant="primary">
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ConnectModal;
