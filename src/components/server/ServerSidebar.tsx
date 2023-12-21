import { redirect } from "next/navigation";
import { ChanelType } from "@prisma/client";

import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerHeader } from "@/components/server/ServerHeader";

interface ServerSidebarProps {
    serverId: string;
}

const ServerSidebar = async ({serverId}: ServerSidebarProps) => {
    const profile = await CurrentProfile();
    if(!profile){
        return redirect('/');
    }

    const server=await db.server.findFirst({
        where:{
            id: serverId,
        },
        include:{
            channel:{
                orderBy: {
                    createdAt: 'asc'
                }
            },
            member: {
                include:{
                    profile: true
                },
                orderBy: {
                    createdAt: 'asc'
                }

            }
        }
    })

    if(!server){
        return redirect('/')
    }

    const textChannels = server ?.channel.filter(channel => channel.type === ChanelType.TEXT);
    const audioChannels = server ?.channel.filter(channel => channel.type === ChanelType.AUDIO);
    const videoChannels = server ?.channel.filter(channel => channel.type === ChanelType.VIDEO);
    const members= server ?.member.filter(member => member.profileId !== profile.id);
    const role= server ?.member.find(member => member.profileId === profile.id)?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
        <ServerHeader server={server} role={role?role:"GUEST"}/>
    </div>
  )
}

export {ServerSidebar}