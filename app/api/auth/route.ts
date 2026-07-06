import { NextRequest, NextResponse } from "next/server";
import { authUser } from "../../../lib/service/auth"

export async function POST(request: NextRequest) {
    const { email, password } = (await request.json()) as { email: string, password: string };
    const authResult = await authUser(email, password)

    if (authResult.success) {
        const response = NextResponse.json({ ok: true });
        response.cookies.set('token', authResult.cookie, {
            httpOnly: true,
            secure: false, //should be true for production
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours (matches JWT expiry)
        })
        return response;
    } else {
        return NextResponse.json({ ok: false });
    }
}