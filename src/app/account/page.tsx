"use client"
import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import React from 'react'


const ClientOnly = () => {
    const { data: session } = useSession()
    if (!session) return null

    return (
        <div>
            <p className='text-2xl font-bold'>Hi {session?.user?.name}!</p>
            <Button onClick={() => {
                signOut()
                location.reload()
            }}>Log Out</Button>
        </div>
    )
}

export default dynamic(() => Promise.resolve(ClientOnly), {
    ssr: false,
});