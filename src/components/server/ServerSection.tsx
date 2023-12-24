"use client";
import { ChanelType, MemberRole } from "@prisma/client";

import { Plus, Settings } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/useModalStore";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    SectionType: "Channel" | "Member";
    ChannelType?: ChanelType;
    server?: ServerWithMembersWithProfiles;
}
const ServerSection = ({label,role,SectionType,server,ChannelType}: ServerSectionProps) => {
    const {onOpen} = useModal();
  return (
    <div className="flex items-center justify-between py-2">
        <p className=" text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
            {label}
        </p>
        {role!==MemberRole.GUEST &&  SectionType==="Channel" && (
            <ActionTooltip label="Create Channel" side="top" align="center">
                <button onClick={()=>onOpen("createChannel",{ChannelType})} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                    <Plus className="h-4 w-4"/>
                </button>
            </ActionTooltip>
        )}
        {role==MemberRole.ADMIN && SectionType==="Member" && (
            <ActionTooltip label="Create Channel" side="top" align="center">
            <button onClick={()=>onOpen("members",{server})} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                <Settings className="h-4 w-4"/>
            </button>
        </ActionTooltip>
        )}
    </div>
  )
}

export default ServerSection