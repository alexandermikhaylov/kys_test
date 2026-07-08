import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/service/user"
import { ClientService } from "@/lib/service/client"
import { User } from "@/lib/schema/user";
import { Client } from "@/lib/schema/client";
import { HEADERS } from "@/proxy";


export async function GET(request: NextRequest) {
    const user = getUserFromRequest(request)
    const client = getClientFromRequest(request)
    if (user && client) {
        if (user.role === 'reviewer' || user.id === client.ownerId) {
            return NextResponse.json({"result": "ok", "payload": client})
        } else {
            return NextResponse.json({"error": "forbidden", "status": 403})
        }
    }
    return NextResponse.json({"error": "not found", "status": 404})
}

export async function PATCH(request: NextRequest) {
    const user = getUserFromRequest(request)
    const client = getClientFromRequest(request)
    const newClient = await request.json()
    if ((client?.ownerId === user?.id || user?.role === 'reviewer') && client?.id != null) {
        ClientService.updateClient(client.id, newClient)
        return NextResponse.json({"result": "ok"})
    }
    return NextResponse.json({"error": "forbidden", "status": 403})
}

export async function DELETE(request: NextRequest) {
    const user = getUserFromRequest(request)
    const client = getClientFromRequest(request)
    if (client?.ownerId === user?.id && client?.id != null) {
        ClientService.deleteClient(client.id)
        return NextResponse.json({"result": "ok"})
    }
    return NextResponse.json({"error": "forbidden", "status": 403})
}

function getUserFromRequest(request: NextRequest): User | null {
    const userId = request.headers.get(HEADERS.HEADER_USER_ID)
    if (userId) {
        return getUser(userId)
    }
    return null
}

function getClientFromRequest(request: NextRequest): Client | null {
    const params = request.nextUrl.searchParams
    const clientId = params.get("id")
    if (clientId) {
        return ClientService.getClient(clientId)
    }
    return null
}