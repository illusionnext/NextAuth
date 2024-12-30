'use server';
import 'server-only';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
// import { cache } from 'react';
import { users } from '@/drizzle/schema';

import { verifySession } from '@/app/auth/stateless-session';
import { forbidden, unauthorized } from 'next/navigation';

export async function getUser() {
    // **EXPERIMENTAL FEATURE**
    'use cache';
    const session = await verifySession();
    // if (!session) return null;

    // **EXPERIMENTAL FEATURE**
    if (!session) unauthorized();

    // Check if the user has the 'admin' role **EXPERIMENTAL FEATURE**
    // if (session.role !== 'admin') {
    //     forbidden();
    // }

    try {
        const data = await db.query.users.findMany({
            where: eq(users.id, session.userId),

            // Explicitly return the columns you need rather than the whole user object
            columns: {
                id: true,
                name: true,
                email: true,
            },
        });

        return data[0];
    } catch (error) {
        console.error('Failed to fetch user', error);
        return null;
    }
}


// *** EXPERIMENTAL FEATURE ***
// File level
// 'use cache'

// export default async function Page() {return <></>}

// Component level
// export async function MyComponent() {
//     'use cache'
//     return <></>
// }

// Function level
// export async function getData() {
//     'use cache'
//     const data = await fetch('/api/data')
//     return data
// }
