import z from "zod";


export const ClientSchema = z.object({
    id: z.string(),
    company_name: z.string(),
    registration_number: z.string(),
    country_code: z.string(),
    estimated_revenue: z.number(),
    status: z.enum(["approved", "pending", "rejected"])
})