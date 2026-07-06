import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "./lib/service/auth";

export const config = {
    matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|auth).*)',
  ],
}

export default async function proxy(request: NextRequest) {

    const token = request.cookies.get('token')?.value;
    let userId
    if (token) {
        userId = await checkToken(token)
    }

    if (userId) {
        const headers = new Headers(request.headers)
        headers.set("X-USER_ID", userId)
        return NextResponse.next({
            request: {
                headers: headers
            }
        })

    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}