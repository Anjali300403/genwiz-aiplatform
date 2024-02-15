"use client";

import {Button} from "@/components/ui/button"
import {Menu} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useState,useEffect } from "react";

interface MobileSidebarProps{
    apiLimitCount: number;
    isUltra: boolean
}
const MobileSidebar=({apiLimitCount=0,isUltra=false}:MobileSidebarProps)=>{
    const[isMounted,setIsMounted]=useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
    return(
        <Sheet>
            <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu/>
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar isUltra={isUltra} apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>      
    )
}
export default MobileSidebar;