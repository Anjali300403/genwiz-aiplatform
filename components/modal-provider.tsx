"use client";

import { useEffect, useState } from "react";
import { ProModal } from "./pro-modal";

export const ModalProvider=()=> {
    const[isMounted,setIsMounted]= useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[]); //[] is dependency array. Effect will run only once when comp mounts 
    
    if(!isMounted){
        return null;
    }
    return(
        <>
       <ProModal/>
       </>
    )
}
