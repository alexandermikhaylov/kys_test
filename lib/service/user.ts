import { User } from "../schema/user";

export const mockUsers: User[] = [
    {
        id: "1",
        login: "applicant",
        password: "applicant",
        role: "applicant"
    },
    {
        id: "2",
        login: "applicant2",
        password: "applicant2",
        role: "applicant"
    },
    {
        id: "3",
        login: "reviewer",
        password: "reviewer",
        role: "reviewer"
    }
]

export function getUser(id: string): User | null {
    return mockUsers.find(user => user.id === id) ?? null
}