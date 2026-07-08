import { Client } from "../schema/client";

const mockClients: Client[] = [
    {
        id: "1",
        company_name: "Test Company",
        registration_number: "123456789",
        country_code: "PL",
        estimated_revenue: 100000,
        status: 'pending',
        ownerId: '1'
    },

    {
        id: "2",
        company_name: "Test Company",
        registration_number: "25156312",
        country_code: "NL",
        estimated_revenue: 10000,
        status: 'approved',
        ownerId: '1'
    },

    {
        id: "3",
        company_name: "Test Company",
        registration_number: "2151256432",
        country_code: "US",
        estimated_revenue: 1000,
        status: 'pending',
        ownerId: '2'
    }
]

export const ClientService = {
    getClient(id: string): Client | null {
        return mockClients.find(client => client.id === id) ?? null
    },

    updateClient(id: string, client: Client) {
        //TODO: update client in the database
    },

    deleteClient(id: string) {
        //TODO: delete client in the database
    },

    createClient(client: Client) {
        //TODO: create client in the database
    }
}
