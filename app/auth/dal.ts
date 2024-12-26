import 'server-only'
import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { users } from '@/drizzle/schema'
import { verifySession } from '@/app/auth/stateless-session'

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const data = await db.query.users.findMany({
            where: eq(users.id, session.userId),

            // Explicitly return the columns you need rather than the whole user object
            columns: {
                id: true,
                name: true,
                email: true,
            },
        })

        return data[0]
    } catch (error) {
        console.error('Failed to fetch user', error)
        return null
    }
})
