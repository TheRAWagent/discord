import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type InviteCodePageProps={
    params: {
        inviteCode:string;
    }
}

const InviteCodePage= async ({params}: InviteCodePageProps)=>{
    const profile= await CurrentProfile();
    if(!profile)
    {
        return RedirectToSignIn({});
    }
    if(!params.inviteCode)
    {
        return redirect('/');
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            member: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(existingServer)
    {
        console.log(existingServer);
        
        return redirect(`/servers/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode
        },
        data: {
            member: {
                create: [
                {
                    profileId: profile.id
                }
                ]
            }
        }
    
    })

    if(server){
        redirect(`/servers/${server.id}`);
    }

    return (
        <div>
            Hello Invite
        </div>
    )

}

export default InviteCodePage;