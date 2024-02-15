import {PrismaClient} from "@prisma/client";

declare global{
    var prisma: PrismaClient | undefined;
}
//adding prisma variable to global environment. 

/*when next 13 reloads there is a chance you may
have a lot of prisma code initialized everytime you
hot reload. */

const prismadb= globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== "production")globalThis.prisma= prismadb;

export default prismadb;