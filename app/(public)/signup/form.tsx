'use client';

import { useActionState } from 'react';
import { signup } from '@/app/auth/auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// *****   IF YOU ADD EXTRA JSX FOR useActionState(), It will not work! ******💥💥💥💥💥🦈🦈🚀🚀🚀

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <form action={action}>
            <div className="flex flex-col gap-2">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" />
                </div>
                {state?.errors?.name && (
                    <p className="text-sm text-red-500">{state.errors.name}</p>
                )}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                    />
                </div>
                {state?.errors?.email && (
                    <p className="text-sm text-red-500">{state.errors.email}</p>
                )}
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" />
                </div>
                {state?.errors?.password && (
                    <div className="text-sm text-red-500">
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Button
                    type="submit"
                    disabled={pending}
                    className="mt-4 w-full"
                >
                    {pending ? 'Submitting...' : 'Sign Up'}
                </Button>
            </div>
        </form>
    );
}
