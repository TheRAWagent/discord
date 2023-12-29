import {member, profile, server} from '@prisma/client'
import {Server as NetServer,Socket} from 'net';
import { NextApiResponse } from 'next';
import {Server as SocketIOServer} from 'socket.io';

declare global{
    type ServerWithMembersWithProfiles= server & {
        members: (member & {profile: profile})[]
    }
    type NextApiResponseSocketIo = NextApiResponse & {
        socket: Socket & {
            server: NetServer & {
                io: SocketIOServer
            };
        };
    };
}