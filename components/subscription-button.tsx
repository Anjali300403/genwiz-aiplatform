"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface SubscriptionButtonProps{
    isUltra: boolean;
}

export const SubscriptionButton=({
    isUltra=false}: SubscriptionButtonProps)=>{
        const[loading,setLoading]=useState(false);
        const Onclick=async()=>{
            try{
                setLoading(true)
                const response= await axios.get("/api/stripe")
                window.location.href=response.data.url
            }catch(error){
                toast.error("something went wrong. Please try again later")
            }finally{
                setLoading(false)
            }
        }
        return(
            <Button disabled={loading} variant={isUltra?"default":"premium"} onClick={Onclick}>
               {isUltra?"Manage Subscription":"Upgrade"} 
               {!isUltra && <Zap className="w-4 h-4 ml-2 fill-white"/>}
            </Button>
        )
    }