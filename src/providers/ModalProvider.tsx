"use client";

import CreateServerModal from "@/components/modals/CreateServerModal";
import { useEffect, useState } from "react";

export const ModalProvider=()=>{
    const [mounted,setMounted]=useState(false)
    useEffect(()=>{
        setMounted(true)
    }
    ,[])

    if(!mounted){
        return null
    }
    return (
        <>
            <CreateServerModal/>
        </>
    )
}