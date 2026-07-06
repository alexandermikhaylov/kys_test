import { NextRequest, NextResponse } from "next/server";
import { authUser } from "../../../lib/service/auth"
import { z } from "zod"

const LoginPayload = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export async function POST(request: NextRequest) {
    const loginPayload = LoginPayload.safeParse(await request.json())
    if (!loginPayload.success) {
        return NextResponse.json({ ok: false });
    }

    const { email, password } = loginPayload.data;
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