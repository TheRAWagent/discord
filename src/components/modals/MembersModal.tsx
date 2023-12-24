"use client";

import { useState } from "react";
import { MemberRole } from "@prisma/client";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/UserAvatar";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuPortal,DropdownMenuSeparator,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuTrigger,DropdownMenuSubTrigger } from "../ui/dropdown-menu";

const roleIconMap= {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500"/>
}

const MembersModal = () => {
    const [loadingId,setLoadingId]=useState<string>("")
    const {isOpen,onOpen,onClose,type,data}=useModal()

    const isModalOpen=isOpen && type === 'members';
    const {server}=data as {server: ServerWithMembersWithProfiles};
    const router = useRouter()
    const onRoleChange = async (role: MemberRole,memberId: string) => {
        try{
            setLoadingId(memberId)
            const url=qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server.id,
                }
            })
            const response = await axios.patch(url,{role})
            router.refresh()
            onOpen("members",{server: response.data})
        }
        catch(error){
            console.log(error);   
        }
        finally{
            setLoadingId("")
        }
    }

    const onKick = async (memberId: string) => {
        try{
            setLoadingId(memberId)
            const url=qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server.id,
                }
            })
            const response = await axios.delete(url)
            router.refresh()
            onOpen("members",{server: response.data})
        }
        catch(error){
            console.log(error);   
        }
        finally{
            setLoadingId("")
        }
    }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black overflow-hidden">
            <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">Manage Members</DialogTitle>
            <DialogDescription className=" text-center text-zinc-500">
                {server?.member?.length} Member{server?.member?.length === 1 ? "":"s"}
            </DialogDescription>
            </DialogHeader>
            {/* <div className="p-6">
                Hello Members
            </div> */}
            <ScrollArea className="mt-8 max-h-[420px] pr-6">
                {server?.member?.map((member)=>(
                    <div key={member.id} className="flex items-center gap-x-2 mb-6">
                        <UserAvatar src={member.profile.imageUrl} />
                        <div className="flex flex-col gap-y-1">
                            <div className="text-xs font-semibold flex items-center gap-x-1">
                                {member.profile.name}
                            {roleIconMap[member.role]}
                                </div>
                            <p className="text-xs text-zinc-500">{member.profile.email}</p>
                        </div>
                        {server.profileId!==member.profileId && loadingId!==member.id && (
                            <div className="ml-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical className="h-4 w-4 text-zinc-500"/>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="left">
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="flex items-center">
                                                <ShieldQuestion className="w-4 h-4 mr-2"/>
                                                <span>Role</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem onClick={()=>onRoleChange("GUEST",member.id)}>
                                                        <Shield className="w-4 h-4 mr-2"/>
                                                        Guest
                                                        {member.role === MemberRole.GUEST && (
                                                            <Check className="w-4 h-4 ml-auto"/>
                                                        )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={()=>onRoleChange("MODERATOR",member.id)}>
                                                        <ShieldCheck className="w-4 h-4 mr-2"/>
                                                        Moderator
                                                        {member.role === MemberRole.MODERATOR && (
                                                            <Check className="w-4 h-4 ml-auto"/>
                                                        )}
                                                        </DropdownMenuItem>
                                                </DropdownMenuSubContent> 
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuSeparator>
                                            <DropdownMenuItem onClick={()=>onKick(member.id)}>
                                                <Gavel className="h-4 w-4 mr-2"/>
                                                Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuSeparator>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                        {loadingId===member.id && (
                            <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"/>
                            )}
                    </div>
                ))
                    
                }
            </ScrollArea>
        </DialogContent>
    </Dialog>
  )
}

export default MembersModal 