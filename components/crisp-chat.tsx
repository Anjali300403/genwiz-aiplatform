"use client";

import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat=()=>{
    useEffect(()=>{
        Crisp.configure("35a8b413-1207-4bb0-b59b-ac502035327c")
    },[])

    return null;
}

