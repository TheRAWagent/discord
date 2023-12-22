"use client";

import { useEffect, useState } from "react";

import CreateServerModal from "@/components/modals/CreateServerModal";
import EditServerModal from "@/components/modals/EditServerModal";
import InviteModal from "@/components/modals/InviteModal";
import MembersModal from "@/components/modals/MembersModal";

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
            <InviteModal />
            <EditServerModal />
            <MembersModal />
        </>
    )
}