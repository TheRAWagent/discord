import {member, profile, server} from '@prisma/client'

declare global{
    type ServerWithMembersWithProfiles= server & {
        member: (member & {profile: profile})[]
    }
}
