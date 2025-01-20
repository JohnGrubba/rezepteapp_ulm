"use client"
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const SignIn = () => {
    const { data: session } = useSession()
    const imagebase64 = session?.user?.image

    return (
        <div>
            {session?.user && (
                <div>
                    <Link href="/account" className="text-gray-600 hover:text-orange-500">
                        <img src={imagebase64 || ""} width={32} className='rounded-full' alt="Profile" />
                    </Link>
                </div>
            ) || (
                    <Button onClick={(e) => {
                        signIn()
                    }} variant="outline">Sign In</Button>

                )}
        </div>
    )
}

export default SignIn