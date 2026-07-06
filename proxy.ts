import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "./lib/service/auth";
import { log } from "console";

const PUBLIC_ROUTES = [
    { "method": "GET", "url": "/api/auth" },
    { "method": "POST", "url": "/api/auth" },
    { "method": "GET", "url": "/favicon" },
    { "method": "GET", "url": "/auth" },
]


export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname;
    console.log(pathName)

    if (PUBLIC_ROUTES.some(route => route.method === request.method && route.url === pathName)) {
        return NextResponse.next()
    }

    if (pathName.startsWith("/_next")) {
        return NextResponse.next();
    }

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