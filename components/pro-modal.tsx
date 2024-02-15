"use client";


import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const tools=[
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",

    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",

    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",

    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10"
    }
]

export const ProModal=()=>{
    const ProModal= useProModal();
    const[loading,setLoading]=useState(false);
    const onSubscribe= async()=>{
        try{
            setLoading(true);
            const response= axios.get("/api/stripe")
            window.location.href=(await response).data.url;
        }catch(error){
            toast.error("Something went wrong. Please try again later")
        }finally{
            setLoading(false)
        }
    }
    return(
        <Dialog open={ProModal.isOpen} onOpenChange={ProModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to Genius
                        <Badge variant="premium" className="uppercase text-sm py-1">
                            Ultra
                        </Badge>
                        </div> 
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-500 font-medium">
                        {tools.map((tools)=>(
                            <Card 
                            key={tools.label}
                            className="p-3 border-black/S flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md",tools.bgColor)}>
                                    <tools.icon className={cn("w-6 h-6",tools.color)}/>
                                    </div>
                                    <div>
                                        {tools.label}
                                    </div>
                                </div>
                                <Check className="text-purple-500 font-extrabold w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button 
                    disabled={loading}
                    onClick={onSubscribe}
                    size="lg"
                    variant="premium"
                    className="w-full">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}