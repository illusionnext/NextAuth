'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/app/auth/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// *****   IF YOU ADD EXTRA JSX FOR useActionState(), It will not work! ******💥💥💥💥💥🦈🦈🚀🚀🚀

export function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined)

    return (
        <form action={action}>
            <div className="flex flex-col gap-2">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="m@example.com"
                        type="email"
                    />
                    {state?.errors?.email && (
                        <p className="text-sm text-red-500">
                            {state.errors.email}
                        </p>
                    )}
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link className="text-sm underline" href="#">
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" name="password" />
                    {state?.errors?.password && (
                        <p className="text-sm text-red-500">
                            {state.errors.password}
                        </p>
                    )}
                </div>
                {state?.message && (
                    <p className="text-sm text-red-500">{state.message}</p>
                )}
                <Button
                    disabled={pending}
                    type="submit"
                    className="mt-4 w-full"
                >
                    {pending ? 'Submitting...' : ' Login'}
                </Button>
            </div>
        </form>
    )
}
