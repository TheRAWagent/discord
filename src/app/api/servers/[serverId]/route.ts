import {CurrentProfile} from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,{params}: {params: {serverId: string}}){
    const {name,imageUrl} = await req.json();
    try{
        const profile = await CurrentProfile();
        if(!profile) return new Response("Unauthorized",{status: 401});

        const server= await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        });
        return NextResponse.json(server);
    }
    catch(e){
        console.log("[SERVER_ID_PATCH]",e);
        return new Response("Internal Error", {status: 500})
    }

} ;