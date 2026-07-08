import { NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/service/user"
import { ClientService } from "@/lib/service/client"
import { User } from "@/lib/schema/user";
import { Client } from "@/lib/schema/client";
import { HEADERS } from "@/proxy";

export async function POST(request: NextRequest) {
    const user = getUserFromRequest(request)
    const newClient = await request.json()
    if (user?.role === 'applicant') {
        ClientService.createClient(newClient)
        return NextResponse.json({ "result": "ok" })
    }
    return NextResponse.json({ "error": "forbidden", "status": 403 })
}

function getUserFromRequest(request: NextRequest): User | null {
    const userId = request.headers.get(HEADERS.HEADER_USER_ID)
    if (userId) {
        return getUser(userId)
    }
    return null
}
