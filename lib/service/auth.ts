import { SignJWT, jwtVerify } from 'jose'
import { User, UserSchema } from '@/lib/schema/user';
import z from 'zod';
import { sign } from 'crypto';

type AuthSuccess = { success: true; user: User, cookie: string };
type AuthFailure = { success: false; error: 'INVALID_CREDENTIALS' | 'ACCOUNT_LOCKED' };

type AuthResult = AuthSuccess | AuthFailure;

const TokenPayloadSchema = UserSchema.pick({ 'id': true, 'role': true })
type TokenPayload = z.infer<typeof TokenPayloadSchema>;


export async function authUser(email: string, password: string): Promise<AuthResult> {
    let userPayload;

    //this should come from the database with actual validation, mock for test purposes
    userPayload = findUserByEmailAndPassword(email, password)
    const user = UserSchema.safeParse(userPayload)
    if (user.success) {    
        return { success: true, user: user?.data, cookie: await signJWT(user) }
    } else {
        return { success: false, error: 'INVALID_CREDENTIALS' }
    }
}

export async function checkToken(token: string) {
    const payload = await verifyJWT(token)
    return findUserById(payload.id)
}

const users = [
    {
        id: "1",
        login: "applicant",
        password: "applicant",
        role: "applicant"
    },
    {
        id: "2",
        login: "reviewer",
        password: "reviewer",
        role: "reviewer"
    }
]

function findUserById(id: string) {
    return users.find(user => user.id === id)
}

function findUserByEmailAndPassword(email: string, password: string) {
    return users.find(user => user.login === email && user.password === password)
}


function signJWT({ ...payload }): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(process.env.JWT_TOKEN))
}

async function verifyJWT(token: string): Promise<TokenPayload> {
    return TokenPayloadSchema.parse((await jwtVerify(token, new TextEncoder().encode(process.env.JWT_TOKEN))).payload)
}