import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "./lib/service/auth";
import { log } from "console";

const PUBLIC_ROUTES = [
    { "method": "GET", "url": "/api/auth" },
    { "method": "POST", "url": "/api/auth" },
    { "method": "GET", "url": "/favicon" },
    { "method": "GET", "url": "/auth" },
]

export const config = {
    matcher: [
        '/api/clients',
        '/clients'
    ]
}

export default async function proxy(request: NextRequest) {

    const token = request.cookies.get('token')?.value;
    let user
    if (token) {
        user = await checkToken(token)
    }

    if (user) {
        return NextResponse.next()
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}